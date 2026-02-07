using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models.Request;
using Backend.Models;
using Backend.Models.Response;
using Backend.Models.DTO;

namespace Backend.Interfaces
{
    public interface ISiteService
    {
        Task<Site> CreateSiteAsync(CreateSiteRequestDto dto, string ownerId);
        Task<ApiResponse<SiteDto>> GetSiteJsonAsync(string subdomain);
        Task<ApiResponse<List<OnlySiteDto>>> GetAllSitesForUserAsync(RequestQueryObject queryObject, string? userId = null);
        Task<ApiResponse<SiteDto>> GetSiteWithPagesAsync(RequestQueryObject queryObject, string? userId = null);
        Task<ApiResponse<string>> SavePageSchemaAsync(string siteSlug, Guid pageUuid, PageSchema schema, string? userId = null);

    }

}