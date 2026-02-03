using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.DTO
{
    public class NotificationDto : BaseDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool IsRead { get; set; } = false;
        public NotificationType Type { get; set; } = NotificationType.INFO;
        public string? UserId { get; set; }
        public AppUser? User { get; set; }
        public string ActionUrl { get; set; } = string.Empty;

    }
}