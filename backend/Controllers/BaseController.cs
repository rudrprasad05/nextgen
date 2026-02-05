using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Interfaces;
using System.IdentityModel.Tokens.Jwt;

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

        // Simplified property to get current user ID
        protected string? CurrentUserId => GetCurrentUserId();

        protected string? GetCurrentUserId()
        {
            // Check multiple claim types in order of preference
            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? User.FindFirst("nameid")?.Value  // JWT standard claim from your token
                ?? User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value  // "sub" standard claim
                ?? User.FindFirst("uid")?.Value;
        }

        // Optional: Get current username
        protected string? CurrentUserName => User.Identity?.Name
            ?? User.FindFirst(ClaimTypes.Name)?.Value
            ?? User.FindFirst("unique_name")?.Value;

        // Optional: Get current user email
        protected string? CurrentUserEmail => User.FindFirst(ClaimTypes.Email)?.Value
            ?? User.FindFirst("email")?.Value;

        // Optional: Get current user roles
        protected IEnumerable<string> CurrentUserRoles => User.FindAll(ClaimTypes.Role).Select(c => c.Value);

        // Optional: Check if user has specific role
        protected bool IsInRole(string role) => User.IsInRole(role);

        // Optional: Debug helper - only use during development
        protected void LogUserClaims()
        {
            if (_logger.IsEnabled(LogLevel.Debug))
            {
                var claims = User.Claims.Select(c => $"{c.Type} = {c.Value}");
                _logger.LogDebug("User Claims: {Claims}", string.Join(", ", claims));
            }
        }
    }
}