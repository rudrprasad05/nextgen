using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Interfaces;
using Backend.Models.Request;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class SiteService : ISiteService
    {
        private readonly ApplicationDbContext _db;
        // private readonly IMediaService _mediaService;

        public SiteService(ApplicationDbContext db)
        {
            _db = db;
            // _mediaService = mediaService;
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
                        Status = PageStatus.Draft
                    }
                };
            }

            // extend later
            return new List<Page>();
        }
    }

}