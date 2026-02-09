using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Organization : BaseModel
    {
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;

        // Subscription info
        public Subscription Subscription { get; set; } = null!; // free, pro, enterprise
        public Guid SubscriptionId { get; set; }
        public int MaxSites { get; set; }
        public int MaxMembers { get; set; }

        // Relationships
        public AppUser Owner { get; set; } = null!;
        public string OwnerId { get; set; } = null!;
        public List<OrganizationMember> Members { get; set; } = new List<OrganizationMember>();
        public List<Site> Sites { get; set; } = new List<Site>();
        public List<Media> Media { get; set; } = new List<Media>();
    }
}