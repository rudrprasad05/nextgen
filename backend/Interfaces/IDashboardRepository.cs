using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure.Core;
using Backend.Models;
using Backend.Models.DTO;
using Backend.Models.Request;
using Backend.Models.Response;

namespace Backend.Interfaces
{
    public interface IDashboardRepository
    {
        Task<ApiResponse<DashboardDto>> GetAdminDashboard(RequestQueryObject queryObject, string? userId = null);
    }

}