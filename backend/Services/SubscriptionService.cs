using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public interface ISubscriptionService
    {
        // Check limits
        Task<bool> CanCreateSite(Guid organizationId);
        Task<bool> CanInviteMember(Guid organizationId);
        Task<bool> CanAddPage(Guid siteId);
        Task<bool> HasFeature(Guid organizationId, string featureName);

        // Get current usage
        Task<SubscriptionUsageDto> GetUsage(Guid organizationId);

        // Plan management
        Task<List<SubscriptionPlan>> GetAvailablePlans();
        Task<SubscriptionPlan> GetPlanById(Guid planId);

        // Subscription management
        Task<Subscription> UpgradePlan(Guid organizationId, Guid planId, BillingInterval interval);
        Task<Subscription> DowngradePlan(Guid organizationId, Guid planId);
        Task CancelSubscription(Guid organizationId);
    }

    public class SubscriptionService : ISubscriptionService
    {
        private readonly ApplicationDbContext _context;

        public SubscriptionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CanCreateSite(Guid organizationId)
        {
            var org = await _context.Organizations
                .Include(o => o.Subscription)
                    .ThenInclude(s => s.Plan)
                .Include(o => o.Sites)
                .FirstOrDefaultAsync(o => o.Id == organizationId);

            if (org?.Subscription == null)
                return false;

            var subscription = org.Subscription;
            var plan = subscription.Plan;

            // Check for custom limit first (grandfathered)
            var maxSites = plan.MaxSites;

            // -1 means unlimited
            if (maxSites == -1) return true;

            var currentSiteCount = org.Sites.Count(s => !s.IsDeleted);

            return currentSiteCount < maxSites;
        }

        public async Task<bool> CanInviteMember(Guid organizationId)
        {
            var org = await _context.Organizations
                .Include(o => o.Subscription)
                    .ThenInclude(s => s.Plan)
                .Include(o => o.Members)
                .FirstOrDefaultAsync(o => o.Id == organizationId);

            if (org?.Subscription == null)
                return false;

            var subscription = org.Subscription;
            var plan = subscription.Plan;

            var maxMembers = plan.MaxMembers;

            if (maxMembers == -1) return true;

            var currentMemberCount = org.Members.Count(m => m.IsActive);

            return currentMemberCount < maxMembers;
        }

        public async Task<bool> HasFeature(Guid organizationId, string featureName)
        {
            var subscription = await _context.Subscriptions
                .Include(s => s.Plan)
                .Where(s => s.OrganizationId == organizationId
                         && s.Status == SubscriptionStatus.Active)
                .FirstOrDefaultAsync();

            if (subscription == null) return false;

            return featureName switch
            {
                "custom_domain" => subscription.Plan.HasCustomDomain,
                "analytics" => subscription.Plan.HasAnalytics,
                "advanced_components" => subscription.Plan.HasAdvancedComponents,
                "api_access" => subscription.Plan.HasApiAccess,
                "white_label" => subscription.Plan.HasWhiteLabel,
                "collaboration" => subscription.Plan.HasCollaboration,
                "version_history" => subscription.Plan.HasVersionHistory,
                "export" => subscription.Plan.HasExport,
                _ => false
            };
        }

        public async Task<SubscriptionUsageDto> GetUsage(Guid organizationId)
        {
            var org = await _context.Organizations
                .Include(o => o.Subscription)
                    .ThenInclude(s => s.Plan)
                .Include(o => o.Sites)
                .Include(o => o.Members)
                .FirstOrDefaultAsync(o => o.Id == organizationId);

            if (org?.Subscription == null)
                throw new Exception("No active subscription");

            var subscription = org.Subscription;
            var plan = subscription.Plan;

            return new SubscriptionUsageDto
            {
                PlanName = plan.Name,

                // Sites
                SitesUsed = org.Sites.Count(s => !s.IsDeleted),
                SitesLimit = plan.MaxSites,
                SitesPercentage = CalculatePercentage(
                    org.Sites.Count(s => !s.IsDeleted),
                    plan.MaxSites
                ),

                // Members
                MembersUsed = org.Members.Count(m => m.IsActive),
                MembersLimit = plan.MaxMembers,
                MembersPercentage = CalculatePercentage(
                    org.Members.Count(m => m.IsActive),
                    plan.MaxMembers
                ),

                // Billing
                NextBillingDate = subscription.CurrentPeriodEnd,
                Status = subscription.Status
            };
        }

        private double CalculatePercentage(int used, int limit)
        {
            if (limit == -1) return 0; // Unlimited
            if (limit == 0) return 100;
            return (used * 100.0) / limit;
        }

        public Task<bool> CanAddPage(Guid siteId)
        {
            throw new NotImplementedException();
        }

        public Task<List<SubscriptionPlan>> GetAvailablePlans()
        {
            throw new NotImplementedException();
        }

        public Task<SubscriptionPlan> GetPlanById(Guid planId)
        {
            throw new NotImplementedException();
        }

        public Task<Subscription> UpgradePlan(Guid organizationId, Guid planId, BillingInterval interval)
        {
            throw new NotImplementedException();
        }

        public Task<Subscription> DowngradePlan(Guid organizationId, Guid planId)
        {
            throw new NotImplementedException();
        }

        public Task CancelSubscription(Guid organizationId)
        {
            throw new NotImplementedException();
        }
    }


}