using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Interfaces;
using Backend.Models;

namespace Backend.Data
{
    public interface IDbInitializer
    {
        Task SeedAsync();
    }

    public class DbInitializer : IDbInitializer
    {
        private readonly UserManager<AppUser> _userManager;

        public DbInitializer(
            UserManager<AppUser> userManager
        )
        {
            _userManager = userManager;
        }

        public async Task SeedAsync()
        {
            await SeedSuperAdmin(_userManager);

        }

        private static async Task SeedSuperAdmin(UserManager<AppUser> userManager)
        {
            if (!await userManager.Users.AnyAsync())
            {
                var admin = new AppUser
                {
                    UserName = "admin",
                    Email = "rudrprasad@yahoo.com",
                    EmailConfirmed = true
                };
                var result = await userManager.CreateAsync(admin, "=TV6Cx>PKqjV");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(admin, "admin");
                }
            }
        }

        private static string GetContentType(string fileName)
        {
            var extension = Path.GetExtension(fileName).ToLowerInvariant();
            return extension switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                ".webp" => "image/webp",
                _ => "application/octet-stream"
            };
        }
    }

}

