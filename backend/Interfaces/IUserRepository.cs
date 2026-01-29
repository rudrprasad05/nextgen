using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace backend.Interfaces
{
    public interface IUserRepository
    {
        Task<List<AppUser>> GetAllAsync(CancellationToken ct);
        Task<AppUser?> GetByIdAsync(string id, CancellationToken ct);
        Task CreateAsync(AppUser user, string password, CancellationToken ct);
    }

}