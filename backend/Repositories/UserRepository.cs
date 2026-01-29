using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<AppUser> _userManager;

        public UserRepository(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<List<AppUser>> GetAllAsync(CancellationToken ct)
        {
            return await _userManager.Users
                .Where(u => !u.IsDeleted)
                .ToListAsync(ct);
        }

        public async Task<AppUser?> GetByIdAsync(string id, CancellationToken ct)
        {
            return await _userManager.Users
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted, ct);
        }

        public async Task CreateAsync(AppUser user, string password, CancellationToken ct)
        {
            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
                throw new InvalidOperationException(string.Join(", ", result.Errors.Select(e => e.Description)));
        }
    }
}
