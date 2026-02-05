using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Interfaces;
using Backend.Models.Request;
using Backend.Models.Response;
using Backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/sites")]
    public class SitesController : BaseController
    {
        private readonly ISiteService _siteService;

        public SitesController(
            ISiteService siteService,
            IConfiguration configuration,
            ILogger<SitesController> logger,
            ITokenService tokenService
        ) : base(configuration, tokenService, logger)
        {

            _siteService = siteService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateSite(
            [FromForm] string name,
            [FromForm] string slug,
            [FromForm] string description,
            [FromForm] string template,
            [FromForm] string defaultSeoTitle,
            [FromForm] string defaultSeoDescription,
            [FromForm] string ownerId,
            [FromForm] SiteStatus status,
            IFormFile? favicon
        )
        {
            var userId = GetCurrentUserId();
            var dto = new CreateSiteRequestDto
            {
                Name = name,
                Slug = slug,
                Description = description,
                Template = string.IsNullOrWhiteSpace(template) ? "blank" : template,
                DefaultSeoTitle = defaultSeoTitle,
                DefaultSeoDescription = defaultSeoDescription,
                OwnerId = userId ?? ownerId,
                Favicon = favicon,
                Status = status
            };
            var site = await _siteService.CreateSiteAsync(dto, userId ?? dto.OwnerId);
            return Ok(ApiResponse<SiteResponseDto>.Ok(new SiteResponseDto
            {
                Id = site.Id,
                Name = site.Name,
                Slug = site.Slug,
                Status = site.Status.ToString()
            }));
        }

        [HttpGet("get-json/{subdomain}")]
        public async Task<IActionResult> GetSiteWithPagesJson(string subdomain)
        {
            var model = await _siteService.GetSiteJsonAsync(subdomain);
            if (!model.Success)
            {
                return StatusCode(model.StatusCode, model);
            }
            return Ok(model);
        }

        [HttpGet("get-all")]
        [Authorize]
        public async Task<IActionResult> GetAllSitesForUser([FromQuery] RequestQueryObject queryObject)
        {
            var userId = CurrentUserId;
            if (string.IsNullOrEmpty(userId))
            {
                return StatusCode(401, ApiResponse<string>.Unauthorised(message: "User ID not found in token"));
            }

            var model = await _siteService.GetAllSitesForUserAsync(queryObject, userId);
            if (!model.Success)
            {
                return StatusCode(model.StatusCode, model);
            }
            return Ok(model);
        }

    }
}