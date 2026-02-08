using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Interfaces;
using Backend.Mappers;
using Backend.Models;
using Backend.Models.DTO;
using Backend.Models.Request;
using Backend.Models.Response;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class PagesRepository : IPagesRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IPageMapper _pageMapper;

        public PagesRepository(ApplicationDbContext context, IPageMapper pageMapper)
        {
            _context = context;
            _pageMapper = pageMapper;
        }

        public Task<Site> CreateSiteAsync(CreateSiteRequestDto dto, string ownerId)
        {
            throw new NotImplementedException();
        }

        public async Task<ApiResponse<PageDto>> CreatePageAsync(
            CreatePageRequestDto dto,
            string userId
        )
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(dto.SiteSlug))
            {
                return ApiResponse<PageDto>.Fail(message: "Site slug is required");
            }

            if (string.IsNullOrWhiteSpace(dto.Title))
            {
                return ApiResponse<PageDto>.Fail(message: "Page title is required");
            }

            // Verify site exists and user has access
            var site = await _context.Sites
                .AsNoTracking()
                .Where(s => s.Slug == dto.SiteSlug && s.OwnerId == userId && !s.IsDeleted)
                .FirstOrDefaultAsync();
            if (site == null)
            {
                return ApiResponse<PageDto>.NotFound(message: "Site not found or inaccessible");
            }

            // Create the page model
            var page = new Page
            {
                Id = Guid.NewGuid(),
                SiteId = site.Id,
                Title = dto.Title,
                Slug = dto.Slug ?? GenerateSlug(dto.Title),
                Status = PageStatus.Draft,
                CreatedOn = DateTime.UtcNow,
                UpdatedOn = DateTime.UtcNow,
                IsDeleted = false,
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
                        Title = dto.Title,
                        Description = dto.Title
                    }
                }
            };

            // Add to database
            await _context.Pages.AddAsync(page);
            await _context.SaveChangesAsync();

            // Map to DTO
            var pageDto = _pageMapper.FromModelToDtoAsync(page);

            return ApiResponse<PageDto>.Ok(pageDto, message: "Page created successfully");
        }

        private string GenerateSlug(string title)
        {
            // Simple slug generation - you may want to enhance this
            return title
                .ToLowerInvariant()
                .Replace(" ", "-")
                .Replace("&", "and")
                .Trim();
        }

        public async Task<ApiResponse<List<PageDto>>> GetAllPagesForSiteAsync(
            RequestQueryObject queryObject,
            string? userId = null)
        {
            if (string.IsNullOrWhiteSpace(queryObject.Slug))
            {
                return ApiResponse<List<PageDto>>.Forbidden(message: "Slug is required");
            }

            // Load the site + its pages in one query
            var site = await _context.Sites
                .AsNoTracking()                           // usually good for read-only
                .Include(s => s.Pages
                    .Where(p => !p.IsDeleted)             // filter deleted pages early
                    .OrderByDescending(p => p.CreatedOn))
                .Where(s => s.Slug == queryObject.Slug
                         && s.OwnerId == userId
                         && !s.IsDeleted)
                .Select(s => new
                {
                    Site = s,
                    Pages = s.Pages
                })
                .FirstOrDefaultAsync();

            if (site == null)
            {
                return ApiResponse<List<PageDto>>.NotFound(message: "Site not found or inaccessible");
            }

            var skip = (queryObject.PageNumber - 1) * queryObject.PageSize;
            // Apply pagination in memory (after we've already filtered to the right site)
            var pagedPages = site.Pages
                .Skip(skip)
                .Take(queryObject.PageSize)
                .ToList();

            var pageDtos = _pageMapper.FromModelToDtoAsync(pagedPages);

            return ApiResponse<List<PageDto>>.Ok(pageDtos);
        }

        public Task<ApiResponse<SiteDto>> GetSiteJsonAsync(string subdomain)
        {
            throw new NotImplementedException();
        }
    }
}