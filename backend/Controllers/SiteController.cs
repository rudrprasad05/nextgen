using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Interfaces;
using Backend.Models.Request;
using Backend.Models.Response;
using Backend.Controllers;
using Backend.Interfaces;
using Backend.Models.Response;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> CreateSite([FromBody] CreateSiteRequestDto dto)
        {

            var site = await _siteService.CreateSiteAsync(dto, GetCurrentUserId() ?? "");
            return Ok(ApiResponse<SiteResponseDto>.Ok(new SiteResponseDto
            {
                Id = site.Id,
                Name = site.Name,
                Slug = site.Slug,
                Status = site.Status.ToString()
            }));
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetSite(Guid id)
        {
            // stub for CreatedAtAction
            return Ok();
        }

    }
}