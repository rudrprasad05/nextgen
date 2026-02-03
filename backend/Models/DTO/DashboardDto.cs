using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public class DashboardDto
    {
        [Required] public long TotalSites { get; set; }
        [Required] public long TotalMedia { get; set; }
        [Required] public long ActiveUsers { get; set; }
        [Required] public long UnreadNotifications { get; set; }
        [Required] public ICollection<NotificationDto> Notifications { get; set; } = new List<NotificationDto>();


    }
}