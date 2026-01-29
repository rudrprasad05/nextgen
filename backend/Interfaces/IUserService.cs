using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models.DTO;
using backend.Models.Request;

namespace backend.Interfaces
{
    public interface IUserService
    {
        Task<List<UserListItemDto>> GetUsersAsync(CancellationToken ct);
        Task CreateUserAsync(CreateUserRequestDto dto, CancellationToken ct);
    }

}