using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{

    // User's Active Subscription
    public class Subscription : BaseModel
    {
        public Guid OrganizationId { get; set; }
        public Organization Organization { get; set; } = null!;
        public Guid PlanId { get; set; }
        public SubscriptionPlan Plan { get; set; } = null!;

        // Billing cycle
        public BillingInterval Interval { get; set; } // Monthly, Yearly
        public SubscriptionStatus Status { get; set; }

        // Dates
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; } // Null = active
        public DateTime CurrentPeriodStart { get; set; }
        public DateTime CurrentPeriodEnd { get; set; }
        public DateTime? CancelledAt { get; set; }
        public DateTime? TrialEndsAt { get; set; }

        // Payment integration (Stripe, Paddle, etc.)
        public string? ExternalSubscriptionId { get; set; } // Stripe subscription ID
        public string? ExternalCustomerId { get; set; } // Stripe customer ID

    }

    public enum BillingInterval
    {
        Monthly = 1,
        Yearly = 2,
        Lifetime = 3 // Special deals
    }

    public enum SubscriptionStatus
    {
        Trialing = 0,
        Active = 1,
        PastDue = 2,
        Cancelled = 3,
        Expired = 4,
        Paused = 5 // For pausing subscription
    }
}