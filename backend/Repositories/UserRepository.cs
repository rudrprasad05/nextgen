using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Interfaces;
using Backend.Mappers;
using Backend.Models;
using Backend.Models.DTO;
using Backend.Models.Request;
using Backend.Models.Response;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class UserRepository : IUserRepository
    {

        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly IUserMapper _userMapper;

        public UserRepository(UserManager<AppUser> userManager, ApplicationDbContext context, IUserMapper userMapper)
        {
            _userManager = userManager;
            _context = context;
            _userMapper = userMapper;
        }

        public async Task<List<AppUser>> GetAllAsync(CancellationToken ct)
        {
            return await _userManager.Users
                .Where(u => !u.IsDeleted)
                .ToListAsync(ct);
        }

        public async Task<ApiResponse<UserDTO>> GetByIdAsync(string id)
        {
            var user = await _userManager.Users
                .FirstOrDefaultAsync(u => u.Id == id && !u.IsDeleted);
            if (user == null)
            {
                return ApiResponse<UserDTO>.NotFound(message: "User not found");
            }
            var dto = await _userMapper.FromModelToDtoAsync(user);
            return ApiResponse<UserDTO>.Ok(dto);
        }
        public async Task<ApiResponse<UserDTO>> CreateAsync(CreateUserRequestDto createUserRequestDto, CancellationToken ct)
        {
            var user = await _userMapper.ToEntityAsync(createUserRequestDto, ct);
            var result = await _userManager.CreateAsync(user, createUserRequestDto.Password);

            if (!result.Succeeded)
                throw new InvalidOperationException(string.Join(", ", result.Errors.Select(e => e.Description)));
            var dto = await _userMapper.FromModelToDtoAsync(user);
            return ApiResponse<UserDTO>.Ok(dto);
        }
    }
}
