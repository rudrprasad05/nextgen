using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Models
{
    public class OrganizationMember : BaseModel
    {
        public OrganizationRole Role { get; set; } // Enum

        public DateTime JoinedAt { get; set; }
        public DateTime? InvitedAt { get; set; }
        public bool IsActive { get; set; }

        // Relationships
        public Organization Organization { get; set; } = null!;
        public Guid OrganizationId { get; set; }
        public AppUser User { get; set; } = null!;
        public string UserId { get; set; } = null!;
    }

    public enum OrganizationRole
    {
        Owner = 1,      // Full access, can delete org, manage billing
        Admin = 2,      // Can manage all sites, invite users
        Editor = 3,     // Can edit assigned sites
        Viewer = 4      // Can only view assigned sites
    }
}