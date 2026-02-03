using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Interfaces;
using Backend.Models.DTO;
using Backend.Models.Request;
using Backend.Models.Response;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly ApplicationDbContext _context;

        public DashboardRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<ApiResponse<DashboardDto>> GetAdminDashboard(RequestQueryObject queryObject)
        {
            long totalMedia = await _context.Medias
                .Where(m => !m.IsDeleted)
                .SumAsync(m => m.SizeInBytes);
            long totalSites = await _context.Sites
                .Where(m => m.OwnerId == queryObject.UserId)
                .CountAsync();
            long totalUsers = await _context.Users.CountAsync();
            var notifications = await _context.Notifications
                .Where(n => n.UserId == queryObject.UserId)
                .OrderByDescending(n => n.CreatedOn)
                .ToListAsync();

            long unreadCount = await _context.Notifications
                .Where(n => n.UserId == queryObject.UserId)
                .CountAsync(n => !n.IsRead);


            var data = new DashboardDto
            {
                TotalSites = totalSites,
                TotalMedia = totalMedia,
                UnreadNotifications = unreadCount,
                ActiveUsers = 0,
                Notifications = notifications.Select(n => new NotificationDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Message = n.Message,
                    IsRead = n.IsRead,
                    CreatedOn = n.CreatedOn
                }).ToList()

            };

            return ApiResponse<DashboardDto>.Ok(data);
        }
    }
}