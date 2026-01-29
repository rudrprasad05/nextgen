using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces;
using backend.Mappers;
using backend.Models.DTO;
using backend.Models.Request;
using Backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        private readonly IUserMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public UserService(
            IUserRepository repo,
            IUserMapper mapper,
            UserManager<AppUser> userManager)
        {
            _repo = repo;
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task<List<UserListItemDto>> GetUsersAsync(CancellationToken ct)
        {
            var users = await _repo.GetAllAsync(ct);
            return users.Select(_mapper.ToListDto).ToList();
        }

        public async Task CreateUserAsync(CreateUserRequestDto dto, CancellationToken ct)
        {
            var user = await _mapper.ToEntityAsync(dto, ct);

            await _repo.CreateAsync(user, dto.Password, ct);

            if (!string.IsNullOrWhiteSpace(dto.Role))
            {
                await _userManager.AddToRoleAsync(user, dto.Role);
            }
        }
    }

}