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
using Backend.Models.DTO;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/pages")]
    public class PagesController : BaseController
    {
        private readonly IPagesRepository _pageRepository;

        public PagesController(
            IPagesRepository pageRepository,
            IConfiguration configuration,
            ILogger<PagesController> logger,
            ITokenService tokenService
        ) : base(configuration, tokenService, logger)
        {
            _pageRepository = pageRepository;
        }

        [HttpGet("get-json/{subdomain}")]
        public async Task<IActionResult> GetSiteWithPagesJson(string subdomain)
        {
            var model = await _pageRepository.GetSiteJsonAsync(subdomain);
            if (!model.Success)
            {
                return StatusCode(model.StatusCode, model);
            }
            return Ok(model);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreatePage(
            [FromQuery] RequestQueryObject query,
            [FromBody] CreatePageRequestDto data
        )
        {
            // Get user ID from claims/auth context
            var userId = GetCurrentUserId();

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "User not authenticated" });
            }

            // Merge query params into DTO if needed
            if (!string.IsNullOrWhiteSpace(query.Slug))
            {
                data.SiteSlug = query.Slug;
            }

            var result = await _pageRepository.CreatePageAsync(data, userId);

            if (!result.Success)
            {
                return StatusCode(result.StatusCode, result);
            }

            return StatusCode(result.StatusCode, result);
        }

        [HttpGet("get-all")]
        [Authorize]
        public async Task<IActionResult> GetAllPagesForSite([FromQuery] RequestQueryObject queryObject)
        {
            var userId = CurrentUserId;
            if (string.IsNullOrEmpty(userId))
            {
                return StatusCode(401, ApiResponse<string>.Unauthorised(message: "User ID not found in token"));
            }

            var model = await _pageRepository.GetAllPagesForSiteAsync(queryObject, userId);
            if (!model.Success)
            {
                return StatusCode(model.StatusCode, model);
            }
            return Ok(model);
        }

    }
}