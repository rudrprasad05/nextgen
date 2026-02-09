using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public interface IAuthorizationService
    {
        // Organization checks
        Task<bool> CanUserAccessOrganization(string userId, Guid orgId);
        Task<bool> CanUserManageOrganization(string userId, Guid orgId);
        Task<bool> CanUserInviteToOrganization(string userId, Guid orgId);
        Task<bool> CanUserCreateSiteInOrganization(string userId, Guid orgId);

        // Site checks
        Task<bool> CanUserAccessSite(string userId, Guid siteId);
        Task<bool> CanUserEditSite(string userId, Guid siteId);
        Task<bool> CanUserDeleteSite(string userId, Guid siteId);
        Task<bool> CanUserManageSiteMembers(string userId, Guid siteId);

        // Get user's role
        Task<OrganizationRole?> GetUserOrganizationRole(string userId, Guid orgId);
        Task<SiteRole?> GetUserSiteRole(string userId, Guid siteId);

        // Get accessible resources
        Task<List<Organization>> GetUserOrganizations(string userId);
        Task<List<Site>> GetUserSites(string userId, Guid? orgId = null);
    }
    public class AuthorizationService : IAuthorizationService
    {
        private readonly ApplicationDbContext _context;

        public Task<bool> CanUserAccessOrganization(string userId, Guid orgId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> CanUserAccessSite(string userId, Guid siteId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> CanUserCreateSiteInOrganization(string userId, Guid orgId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> CanUserDeleteSite(string userId, Guid siteId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> CanUserEditSite(string userId, Guid siteId)
        {
            // Platform admin can do anything
            var user = await _context.Users.FindAsync(userId);
            if (user?.IsPlatformAdmin == true) return true;

            var site = await _context.Sites
                .Include(s => s.Organization)
                    .ThenInclude(o => o.Members)
                .Include(s => s.Members)
                .FirstOrDefaultAsync(s => s.Id == siteId);

            if (site == null) return false;

            // Site owner can edit
            if (site.OwnerId == userId) return true;

            // Organization owner/admin can edit any site in their org
            var orgMember = site.Organization.Members
                .FirstOrDefault(m => m.UserId == userId);

            if (orgMember != null &&
                (orgMember.Role == OrganizationRole.Owner ||
                 orgMember.Role == OrganizationRole.Admin))
            {
                return true;
            }

            // Site-specific editor role
            var siteMember = site.Members
                .FirstOrDefault(m => m.UserId == userId);

            return siteMember?.Role == SiteRole.Editor;
        }

        public Task<bool> CanUserInviteToOrganization(string userId, Guid orgId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> CanUserManageOrganization(string userId, Guid orgId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> CanUserManageSiteMembers(string userId, Guid siteId)
        {
            throw new NotImplementedException();
        }

        public Task<OrganizationRole?> GetUserOrganizationRole(string userId, Guid orgId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Organization>> GetUserOrganizations(string userId)
        {
            throw new NotImplementedException();
        }

        public Task<SiteRole?> GetUserSiteRole(string userId, Guid siteId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Site>> GetUserSites(string userId, Guid? orgId = null)
        {
            var user = await _context.Users.FindAsync(userId);

            // Platform admin sees everything
            if (user?.IsPlatformAdmin == true)
            {
                return await _context.Sites
                    .Where(s => !s.IsDeleted &&
                           (orgId == null || s.OrganizationId == orgId))
                    .ToListAsync();
            }

            // Get sites through various access paths
            var sites = await _context.Sites
                .Where(s => !s.IsDeleted &&
                       (orgId == null || s.OrganizationId == orgId) &&
                       (
                           // Sites they own
                           s.OwnerId == userId ||

                           // Sites in orgs where they're owner/admin
                           s.Organization.Members.Any(m =>
                               m.UserId == userId &&
                               (m.Role == OrganizationRole.Owner ||
                                m.Role == OrganizationRole.Admin)) ||

                           // Sites they have explicit access to
                           s.Members.Any(m => m.UserId == userId)
                       ))
                .Include(s => s.Organization)
                .Include(s => s.Members)
                .ToListAsync();

            return sites;
        }
    }
}