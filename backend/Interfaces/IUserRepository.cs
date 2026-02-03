using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Models.DTO;
using Backend.Models.Request;
using Backend.Models.Response;

namespace Backend.Interfaces
{
    public interface IUserRepository
    {
        Task<List<AppUser>> GetAllAsync(CancellationToken ct);
        Task<ApiResponse<UserDTO>> GetByIdAsync(string id);
        Task<ApiResponse<UserDTO>> CreateAsync(CreateUserRequestDto user, CancellationToken ct);
    }

}