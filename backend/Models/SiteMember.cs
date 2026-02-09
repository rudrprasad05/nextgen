using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class SiteMember : BaseModel
    {
        public Guid SiteId { get; set; }
        public string UserId { get; set; } = null!;
        public SiteRole Role { get; set; }

        public DateTime GrantedAt { get; set; }
        public string? GrantedBy { get; set; } // UserId who granted access

        // Relationships
        public Site Site { get; set; } = null!;
        public AppUser User { get; set; } = null!;
    }

    public enum SiteRole
    {
        Owner = 1,      // Creator, full control
        Editor = 2,     // Can edit pages, settings
        Viewer = 3      // Read-only access
    }
}