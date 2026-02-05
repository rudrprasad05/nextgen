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