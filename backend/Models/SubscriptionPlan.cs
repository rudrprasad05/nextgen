using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    // Subscription Plan Definition (Your SaaS Product Tiers)
    public class SubscriptionPlan : BaseModel
    {
        public string Name { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        // Pricing
        public decimal MonthlyPrice { get; set; }
        public decimal YearlyPrice { get; set; }
        public string Currency { get; set; } = "USD";

        // Limits
        public int MaxSites { get; set; }
        public int MaxMembers { get; set; }
        public int MaxPagesPerSite { get; set; }
        public long MaxStorageMB { get; set; }
        public int MaxCustomDomains { get; set; }

        // Features (boolean flags)
        public bool HasCustomDomain { get; set; }
        public bool HasAnalytics { get; set; }
        public bool HasAdvancedComponents { get; set; }
        public bool HasApiAccess { get; set; }
        public bool HasPrioritySupport { get; set; }
        public bool HasWhiteLabel { get; set; } // Remove "Powered by YourApp"
        public bool HasCollaboration { get; set; }
        public bool HasVersionHistory { get; set; }
        public bool HasExport { get; set; }

        // Metadata
        public int SortOrder { get; set; } // For display ordering
        public bool IsActive { get; set; } // Can new users subscribe?
        public bool IsPublic { get; set; } // Show on pricing page?
        public DateTime CreatedAt { get; set; }
        public DateTime? DeprecatedAt { get; set; } // When you retire a plan

        // Navigation
        public List<Subscription> Subscriptions { get; set; } = new List<Subscription>();
    }

}