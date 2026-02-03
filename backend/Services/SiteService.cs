using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Interfaces;
using Backend.Models.Request;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Backend.Models.Response;
using Backend.Models.DTO;
using Backend.Mappers;

namespace Backend.Services
{
    public class SiteService : ISiteService
    {
        private readonly ApplicationDbContext _db;
        private readonly ISiteMapper _siteMapper;

        public SiteService(ApplicationDbContext db, ISiteMapper siteMapper)
        {
            _db = db;
            _siteMapper = siteMapper;
        }

        public async Task<ApiResponse<List<OnlySiteDto>>> GetAllSitesForUserAsync(RequestQueryObject queryObject)
        {
            var exists = await _db.Users.FirstOrDefaultAsync(x => x.Id == queryObject.UUID.ToString());
            if (exists == null)
            {
                return ApiResponse<List<OnlySiteDto>>.NotFound(message: "the object doesnt exists");
            }

            var sites = await _db.Sites
                .Where(x => x.OwnerId == queryObject.UUID.ToString() && !x.IsDeleted)
                .ToListAsync();

            return ApiResponse<List<OnlySiteDto>>.Ok(await _siteMapper.FromModelToDtoAsync(sites));
        }
        public async Task<Site> CreateSiteAsync(CreateSiteRequestDto dto, string ownerId)
        {
            // Slug uniqueness check
            var slugExists = await _db.Sites.AnyAsync(x => x.Slug == dto.Slug && !x.IsDeleted);
            if (slugExists)
                throw new InvalidOperationException("Slug already exists");

            // if (!string.IsNullOrWhiteSpace(dto.Favicon))
            // {
            //     faviconMedia = await _mediaService.CreateFromBase64Async(
            //         dto.Favicon,
            //         ownerId,
            //         MediaType.Favicon
            //     );
            // }

            var site = new Site
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Slug = dto.Slug,
                OwnerId = ownerId,
                Status = dto.Status,
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow,
                Pages = CreateDefaultPages(dto.Template)
            };

            _db.Sites.Add(site);
            await _db.SaveChangesAsync();

            return site;
        }

        private ICollection<Page> CreateDefaultPages(string template)
        {
            if (template == "blank")
            {
                return new List<Page>
                {
                    new Page
                    {
                        Id = Guid.NewGuid(),
                        Title = "Home",
                        Slug = "home",
                        Status = PageStatus.Draft,
                        CreatedOn = DateTime.UtcNow,
                        UpdatedOn = DateTime.UtcNow,
                        Schema = new PageSchema
                        {
                            Root = new ElementNode
                            {
                                Id = "body",
                                Type = ElementType.Body,
                                Props = new Dictionary<string, object>(),
                                Children = new List<ElementNode>()
                            },
                            MetaData = new MetaDataModel
                            {
                                Title = "New Website",
                                Description = "New website"
                            }
                        }
                    }
                };
            }

            // extend later
            return new List<Page>();
        }
    }

}