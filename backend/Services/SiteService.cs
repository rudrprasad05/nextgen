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
using System.Text.Json;

namespace Backend.Services
{
    public class SiteService : ISiteService
    {
        private readonly ApplicationDbContext _db;
        private readonly ISiteMapper _siteMapper;
        private readonly IMediaRepository _mediaRepository;

        public SiteService(ApplicationDbContext db, ISiteMapper siteMapper, IMediaRepository mediaRepository)
        {
            _db = db;
            _siteMapper = siteMapper;
            _mediaRepository = mediaRepository;
        }

        public async Task<ApiResponse<string>> SavePageSchemaAsync(
            string siteSlug,
            Guid pageUuid,
            PageSchema schema,
            string? userId = null
        )
        {
            var userExists = await _db.Users
                .AsNoTracking()
                .AnyAsync(x => x.Id == userId);

            if (!userExists)
            {
                return ApiResponse<string>.Unauthorised();
            }

            var site = await _db.Sites
                .Include(s => s.Pages)
                .FirstOrDefaultAsync(x =>
                    x.Slug == siteSlug &&
                    x.OwnerId == userId &&
                    !x.IsDeleted
                );

            if (site == null)
            {
                return ApiResponse<string>.NotFound(message: "site not found");
            }

            var page = site.Pages.FirstOrDefault(p => p.Id == pageUuid);

            if (page == null)
            {
                return ApiResponse<string>.NotFound(message: "page not found");
            }

            page.Schema = schema;
            page.UpdatedOn = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return ApiResponse<string>.Ok(data: "saved");
        }


        public async Task<ApiResponse<List<OnlySiteDto>>> GetAllSitesForUserAsync(RequestQueryObject queryObject, string? userId = null)
        {
            var exists = await _db.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (exists == null)
            {
                return ApiResponse<List<OnlySiteDto>>.NotFound(message: "the object doesnt exists");
            }

            var sites = await _db.Sites
                .Where(x => x.OwnerId == userId && !x.IsDeleted)
                .Include(s => s.Screenshot)
                .ToListAsync();

            return ApiResponse<List<OnlySiteDto>>.Ok(await _siteMapper.FromModelToOnlyDtoAsync(sites));
        }
        public async Task<Site> CreateSiteAsync(CreateSiteRequestDto dto, string ownerId)
        {
            // Slug uniqueness check
            var faviconMedia = null as MediaDto;
            var slugExists = await _db.Sites.AnyAsync(x => x.Slug == dto.Slug && !x.IsDeleted);

            if (slugExists)
                throw new InvalidOperationException("Slug already exists");

            if (dto.Favicon != null)
            {
                var tempMedia = new Media
                {
                    AltText = $"Favicon for site {dto.Name}",
                    FileName = dto.Favicon.FileName,
                    ContentType = dto.Favicon.ContentType,
                    SizeInBytes = dto.Favicon.Length,
                    ShowInGallery = true,
                    OwnerId = ownerId,
                };
                faviconMedia = (await _mediaRepository.CreateAsync(tempMedia, dto.Favicon)).Data;
            }

            var site = new Site
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                Slug = dto.Slug,
                OwnerId = ownerId,
                Status = dto.Status,
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow,
                Pages = CreateDefaultPages(dto.Template),
                ScreenshotId = faviconMedia?.Id ?? null
            };

            _db.Sites.Add(site);
            await _db.SaveChangesAsync();

            return site;
        }

        public async Task<ApiResponse<SiteDto>> GetSiteWithPagesAsync(RequestQueryObject queryObject, string? userId = null)
        {
            var site = await _db.Sites
            .Include(x => x.Pages)
            .FirstOrDefaultAsync(x => x.OwnerId == userId && x.Slug == queryObject.Slug && !x.IsDeleted);

            if (site == null)
            {
                return ApiResponse<SiteDto>.NotFound(message: "Site not found");
            }

            return ApiResponse<SiteDto>.Ok(await _siteMapper.FromModelToDtoAsync(site));
        }



        public async Task<ApiResponse<SiteDto>> GetSiteJsonAsync(string subdomain)
        {
            var site = await _db.Sites
                .Include(x => x.Screenshot)
                .Include(x => x.Pages.Where(p => !p.IsDeleted))
                .FirstOrDefaultAsync(x => x.Slug == subdomain && !x.IsDeleted);
            if (site == null)
            {
                return ApiResponse<SiteDto>.NotFound(message: "Site not found");
            }

            return ApiResponse<SiteDto>.Ok(await _siteMapper.FromModelToDtoAsync(site));
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