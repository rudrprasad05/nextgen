using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Backend.Data;
using Backend.Models;

namespace Backend.Config
{
    /// <summary>
    /// Authentication file responsible for handling cors and JWT
    /// </summary>
    public static class Authentication
    {
        public static void AddAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var frontend = configuration["AllowedHosts"] ?? throw new InvalidOperationException();
            var corsOriginsString = configuration["CorsOrigins"];

            string[] allowedOrigins = {
                "http://api.test.home:5080",
                "http://localhost:3000",
                "http://test.home:3000",
                "http://test.home",
                "http://frcs-api.procyonfiji.com"
            };

            services.AddCors(c =>
            {
                c.AddPolicy("allowSpecificOrigin", options =>
                {
                    options
                        .WithOrigins(allowedOrigins)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
                });
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme =
                options.DefaultChallengeScheme =
                options.DefaultForbidScheme =
                options.DefaultScheme =
                options.DefaultSignInScheme =
                options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = configuration["JWT:Issuer"],
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidAudience = configuration["JWT:Audience"],
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        System.Text.Encoding.UTF8.GetBytes(configuration["JWT:SigningKey"] ?? throw new InvalidOperationException())
                    ),
                    RoleClaimType = ClaimTypes.Role,
                    ClockSkew = TimeSpan.Zero // Optional: removes 5 min default tolerance
                };

                // THIS IS THE KEY PART - Read JWT from cookie
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        // First, try to get token from cookie
                        if (context.Request.Cookies.TryGetValue("token", out var token))
                        {
                            context.Token = token;
                        }
                        // Fallback to Authorization header if no cookie
                        else if (context.Request.Headers.ContainsKey("Authorization"))
                        {
                            var authHeader = context.Request.Headers["Authorization"].ToString();
                            if (authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                            {
                                context.Token = authHeader.Substring("Bearer ".Length).Trim();
                            }
                        }

                        return Task.CompletedTask;
                    },
                    OnAuthenticationFailed = context =>
                    {
                        var logger = context.HttpContext.RequestServices
                            .GetRequiredService<ILogger<Program>>();
                        logger.LogError("JWT Authentication failed: {Error}", context.Exception.Message);
                        logger.LogError("Exception details: {StackTrace}", context.Exception.StackTrace);
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        var logger = context.HttpContext.RequestServices
                            .GetRequiredService<ILogger<Program>>();
                        var userName = context.Principal?.Identity?.Name ?? "Unknown";
                        var userId = context.Principal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                        logger.LogInformation("Token validated successfully for user: {UserName} (ID: {UserId})", userName, userId);
                        return Task.CompletedTask;
                    },
                    OnChallenge = context =>
                    {
                        var logger = context.HttpContext.RequestServices
                            .GetRequiredService<ILogger<Program>>();
                        logger.LogWarning("JWT Challenge issued. Error: {Error}, ErrorDescription: {ErrorDescription}",
                            context.Error, context.ErrorDescription);
                        return Task.CompletedTask;
                    }
                };
            });
        }

        // Add Identity Services
        public static void AddIdentityService(this IServiceCollection services)
        {
            services.AddIdentity<AppUser, IdentityRole>(
                options =>
                {
                    options.User.RequireUniqueEmail = true;
                    options.Password.RequireDigit = true;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireUppercase = true;
                    options.Password.RequireNonAlphanumeric = true;
                    options.Password.RequiredLength = 8;
                }
            )
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();
        }
    }
}