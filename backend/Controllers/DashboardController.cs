using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Controllers;
using Backend.Interfaces;
using Backend.Models.Request;
using Backend.Models.Response;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : BaseController
    {
        private readonly IDashboardRepository _dashboardRepository;
        public DashboardController(
           IDashboardRepository dashboardRepository,
           IConfiguration configuration,
           ILogger<DashboardController> logger,
           ITokenService tokenService
       ) : base(configuration, tokenService, logger)
        {

            _dashboardRepository = dashboardRepository;
        }
        [HttpGet("admin-dashboard")]
        public async Task<IActionResult> GetAdminDashboard([FromQuery] RequestQueryObject queryObject)
        {
            var userId = CurrentUserId;
            if (string.IsNullOrEmpty(userId))
            {
                return StatusCode(401, ApiResponse<string>.Unauthorised(message: "User ID not found in token"));
            }
            var media = await _dashboardRepository.GetAdminDashboard(queryObject, userId);
            if (media == null)
            {
                return BadRequest(ApiResponse<string>.Fail(message: "fail"));
            }

            return Ok(media);
        }
        // [HttpGet("get-storage-used")]
        // public async Task<IActionResult> GetStorageUsed()
        // {
        //     var media = await _siteRepository.GetStorageUsed();
        //     if (media == null)
        //     {
        //         return BadRequest(ApiResponse<string>.Fail(message: "fail"));
        //     }

        //     return Ok(media);
        // }
    }
}