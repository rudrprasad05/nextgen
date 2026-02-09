using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.DTO
{
    public class SubscriptionUsageDto
    {
        public string PlanName { get; set; }

        public int SitesUsed { get; set; }
        public int SitesLimit { get; set; } // -1 = unlimited
        public double SitesPercentage { get; set; }

        public int MembersUsed { get; set; }
        public int MembersLimit { get; set; }
        public double MembersPercentage { get; set; }

        public DateTime NextBillingDate { get; set; }
        public SubscriptionStatus Status { get; set; }
    }
}