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
        private readonly IMediaRepository _mediaRepository;

        public DbInitializer(
            UserManager<AppUser> userManager,
            IMediaRepository mediaRepository
        )
        {
            _userManager = userManager;
            _mediaRepository = mediaRepository;
        }

        public async Task SeedAsync()
        {
            await SeedSuperAdmin(_userManager, _mediaRepository);

        }

        private static async Task SeedSuperAdmin(UserManager<AppUser> userManager, IMediaRepository mediaRepository)
        {
            if (!await userManager.Users.AnyAsync())
            {
                // 1️⃣ Create the user
                var admin = new AppUser
                {
                    UserName = "admin",
                    Email = "rudrprasad@yahoo.com",
                    EmailConfirmed = true,
                    IsPlatformAdmin = true
                };

                var result = await userManager.CreateAsync(admin, "=TV6Cx>PKqjV");
                if (!result.Succeeded) return;

                // 2️⃣ Add role
                await userManager.AddToRoleAsync(admin, "admin");

                // 3️⃣ Attach profile image
                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "Assets", "Images", "admin_profile_image.jpg");
                if (File.Exists(imagePath))
                {
                    // Simulate IFormFile from local file
                    var fileStream = File.OpenRead(imagePath);
                    var fileName = Path.GetFileName(imagePath);
                    var formFile = new FormFile(fileStream, 0, fileStream.Length, "file", fileName)
                    {
                        Headers = new HeaderDictionary(),
                        ContentType = "image/jpeg"
                    };

                    var media = new Media
                    {
                        AltText = "Admin Profile Image",
                        ContentType = "image/jpeg",
                        FileName = fileName,
                        SizeInBytes = fileStream.Length,
                        ShowInGallery = false,
                        UploadedByUserId = admin.Id
                    };

                    var mediaResult = await mediaRepository.CreateAsync(media, formFile);
                    if (mediaResult.Success)
                    {
                        // Link media to user
                        admin.ProfilePictureId = media.Id;
                        await userManager.UpdateAsync(admin);
                    }
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

