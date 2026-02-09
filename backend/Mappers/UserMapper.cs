using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models.DTO;
using Backend.Models.Request;
using Backend.Models;
using Microsoft.AspNetCore.Identity;

namespace Backend.Mappers
{
    public interface IUserMapper
    {
        Task<AppUser> ToEntityAsync(CreateUserRequestDto dto, CancellationToken ct);
        Task<UserDTO> FromModelToDtoAsync(AppUser request);
        UserListItemDto ToListDto(AppUser user);
    }

    public class UserMapper : IUserMapper
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<AppUser> _userManager;

        public UserMapper(ApplicationDbContext db, UserManager<AppUser> userManager)
        {
            _db = db;
            _userManager = userManager;
        }

        public async Task<AppUser> ToEntityAsync(CreateUserRequestDto dto, CancellationToken ct)
        {
            var user = new AppUser
            {
                UserName = dto.Username,
                Email = dto.Email,
                IsDeleted = true,
                CreatedOn = DateTime.UtcNow
            };

            if (!dto.SiteAccess.AllSites)
            {
                foreach (var site in dto.SiteAccess.Sites)
                {
                    user.Sites.Add(new SiteUser
                    {
                        SiteId = site.SiteId,
                        // Permissions = site.Permissions
                    });
                }
            }

            return user;
        }

        public async Task<UserDTO> FromModelToDtoAsync(AppUser request)
        {
            if (request == null)
                return new UserDTO();

            var dto = new UserDTO
            {
                Id = request.Id,
                CreatedOn = request.CreatedOn,
                UpdatedOn = request.UpdatedOn,
                Username = request.UserName ?? "",
                IsDeleted = request.IsDeleted,
                Email = request.Email ?? "",

            };

            var roles = await _userManager.GetRolesAsync(request);

            dto.Role = string.Join(", ", roles);

            return dto;
        }
        public UserListItemDto ToListDto(AppUser user)
        {
            return new UserListItemDto
            {
                Id = user.Id,
                Username = user.UserName!,
                Email = user.Email!,
                // Role = user.Role!,
                // IsActive = user.IsActive,
                CreatedOn = user.CreatedOn
            };
        }
    }

}