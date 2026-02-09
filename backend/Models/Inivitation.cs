using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Invitation : BaseModel
    {
        public Guid OrganizationId { get; set; }
        public Organization Organization { get; set; } = null!;
        public OrganizationRole OrgRole { get; set; }

        public Guid? SiteId { get; set; } // Null = org invite, set = site invite
        public Site? Site { get; set; }
        public SiteRole? SiteRole { get; set; }

        public string InvitedByUserId { get; set; } = null!;
        public AppUser InvitedByUser { get; set; } = null!;
        public int MyProperty { get; set; }

        public string Email { get; set; } = null!;
        public DateTime? AcceptedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
        public Guid Token { get; set; } = Guid.NewGuid();
        public InvitationStatus Status { get; set; }

    }

    public enum InvitationStatus
    {
        Pending,
        Accepted,
        Expired,
        Revoked
    }
}