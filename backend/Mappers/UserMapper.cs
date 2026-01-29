using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models.DTO;
using backend.Models.Request;
using Backend.Models;

namespace backend.Mappers
{
    public interface IUserMapper
    {
        Task<AppUser> ToEntityAsync(CreateUserRequestDto dto, CancellationToken ct);
        UserListItemDto ToListDto(AppUser user);
    }

    public class UserMapper : IUserMapper
    {
        private readonly ApplicationDbContext _db;

        public UserMapper(ApplicationDbContext db)
        {
            _db = db;
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

            // Example: IP whitelist
            // user.IpWhitelist = dto.IpWhitelist;

            // Example: flags
            // user.CanManageUsers = dto.Flags.CanManageUsers;
            // user.CanDeploySites = dto.Flags.CanDeploySites;

            // Site access mapping (async-ready)
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