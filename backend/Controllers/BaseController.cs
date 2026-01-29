using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;

namespace Backend.Controllers
{
    // Base Controller with common dependencies and methods
    public abstract class BaseController : ControllerBase
    {
        protected readonly IConfiguration _configuration;
        protected readonly ITokenService _tokenService;
        protected readonly ILogger _logger;


        public BaseController(IConfiguration configuration, ITokenService tokenService, ILogger logger)
        {
            _configuration = configuration;
            _tokenService = tokenService;
            _logger = logger;
        }
        // Get user ID from HttpContext items
        protected string? UserId => HttpContext.Items["UserId"]?.ToString();

        protected string? GetCurrentUserId()
        {
            var claims = User.Claims.ToList();
            foreach (var c in claims)
            {
                Console.WriteLine($"{c.Type} = {c.Value}");
            }

            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                   ?? User.FindFirst("sub")?.Value
                   ?? User.FindFirst("uid")?.Value;
        }
    }
}