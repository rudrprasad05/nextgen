using System.Text.Json;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<AppUser>
{
    public ApplicationDbContext(DbContextOptions options) : base(options) { }

    // Identity
    public DbSet<Invitation> Invitations { get; set; }
    public DbSet<Media> Medias { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Organization> Organizations { get; set; }
    public DbSet<OrganizationMember> OrganizationMembers { get; set; }
    public DbSet<Page> Pages { get; set; }
    public DbSet<PageSchemaVersion> PageSchemaVersions { get; set; }
    public DbSet<Site> Sites { get; set; }
    public DbSet<SiteMember> SiteMembers { get; set; }
    public DbSet<Subscription> Subscriptions { get; set; }
    public DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }

    // Sites / Pages


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // -----------------------------
        // Identity setup
        // -----------------------------

        modelBuilder.Entity<IdentityUserLogin<string>>()
            .HasKey(x => new { x.LoginProvider, x.ProviderKey });

        modelBuilder.Entity<IdentityUserRole<string>>()
            .HasKey(x => new { x.UserId, x.RoleId });

        modelBuilder.Entity<IdentityUserToken<string>>()
            .HasKey(x => new { x.UserId, x.LoginProvider, x.Name });

        modelBuilder.UseCollation("utf8mb4_general_ci");

        // Seed roles (TEMPORARY – non-authoritative)
        modelBuilder.Entity<IdentityRole>().HasData(
            new IdentityRole
            {
                Id = "f37bcdeb-02a5-4523-af63-063db424aaf3",
                Name = "admin",
                NormalizedName = "ADMIN",
            },
            new IdentityRole
            {
                Id = "e3f1f724-cd8b-4370-a40f-a82d3ebdff01",
                Name = "user",
                NormalizedName = "USER"
            }
        );

        // -----------------------------
        // Notification
        // -----------------------------

        modelBuilder.Entity<Notification>(e =>
        {
            e.HasOne(n => n.User)
             .WithMany(u => u.Notifications)
             .HasForeignKey(n => n.UserId)
             .OnDelete(DeleteBehavior.SetNull);

            e.HasIndex(n => n.IsRead);
            e.HasIndex(n => n.CreatedOn);
        });

        // -----------------------------
        // Media
        // -----------------------------

        modelBuilder.Entity<Media>(e =>
    {
        // Owner relationship
        e.HasOne(m => m.UploadedByUser)
            .WithMany()
            .HasForeignKey(m => m.UploadedByUserId)
            .OnDelete(DeleteBehavior.Restrict);

        e.HasOne(m => m.Organization)
            .WithMany(o => o.Media)
            .HasForeignKey(m => m.OrganizationId)
            .OnDelete(DeleteBehavior.Cascade);

        e.HasIndex(m => m.UploadedByUserId);
        e.HasIndex(m => m.ObjectKey).IsUnique();
        e.HasIndex(m => m.CreatedOn);


        e.Property(m => m.Url).IsRequired().HasMaxLength(2048);
        e.Property(m => m.ObjectKey).IsRequired().HasMaxLength(500);
        e.Property(m => m.FileName).IsRequired().HasMaxLength(255);
        e.Property(m => m.ContentType).IsRequired().HasMaxLength(100);
    });

        // -----------------------------
        // Site
        // -----------------------------

        modelBuilder.Entity<Site>(e =>
        {
            // Organization relationship
            e.HasOne(s => s.Organization)
                .WithMany(o => o.Sites)
                .HasForeignKey(s => s.OrganizationId)
                .OnDelete(DeleteBehavior.Cascade);

            // Owner relationship
            e.HasOne(s => s.Owner)
                .WithMany() // Assuming AppUser doesn't have a Sites collection
                .HasForeignKey(s => s.OwnerId)
                .OnDelete(DeleteBehavior.Restrict); // Don't cascade delete when user is deleted

            // Screenshot relationship (optional)
            e.HasOne(s => s.Screenshot)
                .WithMany()
                .HasForeignKey(s => s.ScreenshotId)
                .OnDelete(DeleteBehavior.SetNull)
                .IsRequired(false);

            // Pages relationship (one-to-many)
            e.HasMany(s => s.Pages)
                .WithOne(p => p.Site)
                .HasForeignKey(p => p.SiteId)
                .OnDelete(DeleteBehavior.Cascade); // Delete pages when site is deleted

            // SiteMembers relationship (one-to-many)
            e.HasMany(s => s.Members)
                .WithOne(sm => sm.Site)
                .HasForeignKey(sm => sm.SiteId)
                .OnDelete(DeleteBehavior.Cascade); // Delete members when site is deleted

            // Indexes
            e.HasIndex(s => s.Slug).IsUnique();
            e.HasIndex(s => s.OrganizationId); // For queries filtering by org
            e.HasIndex(s => s.OwnerId); // For queries filtering by owner
            e.HasIndex(s => new { s.OrganizationId, s.Slug }).IsUnique(); // Slug unique per org
        });

        // -----------------------------
        // Page
        // -----------------------------

        modelBuilder.Entity<Page>(e =>
        {
            e.HasOne(p => p.Site)
             .WithMany(s => s.Pages)
             .HasForeignKey(p => p.SiteId)
             .OnDelete(DeleteBehavior.Cascade);

            e.HasIndex(p => new { p.SiteId, p.Slug }).IsUnique();

            e.HasMany(p => p.SchemaVersions)
              .WithOne(sv => sv.Page)
              .HasForeignKey(sv => sv.PageId)
              .OnDelete(DeleteBehavior.Cascade);

            e.HasOne(p => p.CurrentSchemaVersion)
                .WithMany() // no back-reference
                .HasForeignKey(p => p.CurrentSchemaVersionId)
                .OnDelete(DeleteBehavior.Restrict);
            e.Property(p => p.MetaData)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                    v => JsonSerializer.Deserialize<MetaDataModel>(v, (JsonSerializerOptions)null)
                );
        });

        modelBuilder.Entity<Invitation>(e =>
        {
            // Organization relationship
            e.HasOne(i => i.Organization)
             .WithMany() // Assuming Organization doesn't track invitations
             .HasForeignKey(i => i.OrganizationId)
             .OnDelete(DeleteBehavior.Cascade); // Delete invitations if org deleted

            // Site relationship (optional)
            e.HasOne(i => i.Site)
             .WithMany()
             .HasForeignKey(i => i.SiteId)
             .OnDelete(DeleteBehavior.Cascade)
             .IsRequired(false);

            // InvitedBy relationship
            e.HasOne(i => i.InvitedByUser)
             .WithMany()
             .HasForeignKey(i => i.InvitedByUserId)
             .OnDelete(DeleteBehavior.Restrict); // Keep invitation even if inviter deleted

            // Enum as string
            e.Property(i => i.Status)
             .HasConversion<string>()
             .HasMaxLength(50);

            e.Property(i => i.OrgRole)
             .HasConversion<string>()
             .HasMaxLength(50);

            e.Property(i => i.SiteRole)
             .HasConversion<string>()
             .HasMaxLength(50)
             .IsRequired(false);

            // Indexes
            e.HasIndex(i => i.Email);
            e.HasIndex(i => i.Token).IsUnique();
            e.HasIndex(i => i.Status);
            e.HasIndex(i => new { i.OrganizationId, i.Email, i.Status }); // Find pending invites

            // Constraints
            e.Property(i => i.Email).IsRequired().HasMaxLength(255);
        });

        // ===== ORGANIZATION =====
        modelBuilder.Entity<Organization>(e =>
        {
            // Owner relationship
            e.HasOne(o => o.Owner)
             .WithMany() // Assuming AppUser doesn't have Organizations collection
             .HasForeignKey(o => o.OwnerId)
             .OnDelete(DeleteBehavior.Restrict); // Don't delete org if owner deleted

            // Members relationship
            e.HasMany(o => o.Members)
             .WithOne(m => m.Organization)
             .HasForeignKey(m => m.OrganizationId)
             .OnDelete(DeleteBehavior.Cascade);

            // Sites relationship
            e.HasMany(o => o.Sites)
             .WithOne(s => s.Organization)
             .HasForeignKey(s => s.OrganizationId)
             .OnDelete(DeleteBehavior.Cascade);

            e.HasOne(o => o.Subscription)
            .WithOne(s => s.Organization)
            .HasForeignKey<Subscription>(s => s.OrganizationId)
            .IsRequired(false); // Organization might not have a subscription yet


            // Indexes
            e.HasIndex(o => o.Slug).IsUnique();
            e.HasIndex(o => o.OwnerId);

            // Constraints
            e.Property(o => o.Name).IsRequired().HasMaxLength(255);
            e.Property(o => o.Slug).IsRequired().HasMaxLength(255);
        });

        // ===== ORGANIZATION MEMBER =====
        modelBuilder.Entity<OrganizationMember>(e =>
        {
            // Organization relationship
            e.HasOne(om => om.Organization)
             .WithMany(o => o.Members)
             .HasForeignKey(om => om.OrganizationId)
             .OnDelete(DeleteBehavior.Cascade);

            // User relationship
            e.HasOne(om => om.User)
             .WithMany() // Assuming AppUser doesn't have OrganizationMembers collection
             .HasForeignKey(om => om.UserId)
             .OnDelete(DeleteBehavior.Cascade); // Remove membership if user deleted

            // Enum as string
            e.Property(om => om.Role)
             .HasConversion<string>()
             .HasMaxLength(50)
             .IsRequired();

            // Indexes
            e.HasIndex(om => new { om.OrganizationId, om.UserId }).IsUnique(); // User can only be member once
            e.HasIndex(om => om.UserId);
            e.HasIndex(om => om.IsActive);

            // Constraints
            e.Property(om => om.JoinedAt).IsRequired();
        });

        modelBuilder.Entity<Subscription>(e =>
        {
            // Organization relationship (one-to-one for active subscription)
            e.HasOne(s => s.Organization)
            .WithOne(o => o.Subscription)
            .HasForeignKey<Subscription>(s => s.OrganizationId)
            .OnDelete(DeleteBehavior.Cascade);

            // Plan relationship
            e.HasOne(s => s.Plan)
            .WithMany(p => p.Subscriptions)
            .HasForeignKey(s => s.PlanId)
            .OnDelete(DeleteBehavior.Restrict); // Keep subscription history if plan deleted

            // Enum as string
            e.Property(s => s.Interval)
            .HasConversion<string>()
            .HasMaxLength(50)
            .IsRequired();

            e.Property(s => s.Status)
            .HasConversion<string>()
            .HasMaxLength(50)
            .IsRequired();

            // Indexes
            e.HasIndex(s => s.OrganizationId);
            e.HasIndex(s => s.Status);
            e.HasIndex(s => s.ExternalSubscriptionId).IsUnique();
            e.HasIndex(s => new { s.OrganizationId, s.Status }); // Find active subscriptions

            // Constraints
            e.Property(s => s.StartDate).IsRequired();
            e.Property(s => s.CurrentPeriodStart).IsRequired();
            e.Property(s => s.CurrentPeriodEnd).IsRequired();
        });

        // ===== SUBSCRIPTION PLAN =====
        modelBuilder.Entity<SubscriptionPlan>(e =>
        {
            // Subscriptions relationship
            e.HasMany(p => p.Subscriptions)
             .WithOne(s => s.Plan)
             .HasForeignKey(s => s.PlanId)
             .OnDelete(DeleteBehavior.Restrict);

            // Indexes
            e.HasIndex(p => p.Slug).IsUnique();
            e.HasIndex(p => p.IsActive);
            e.HasIndex(p => p.IsPublic);

            // Constraints
            e.Property(p => p.Name).IsRequired().HasMaxLength(100);
            e.Property(p => p.Slug).IsRequired().HasMaxLength(100);
            e.Property(p => p.Currency).IsRequired().HasMaxLength(3); // USD, EUR, etc.
        });


        // ===== PAGE SCHEMA VERSION =====
        modelBuilder.Entity<PageSchemaVersion>(e =>
        {
            // Page relationship
            e.HasOne(psv => psv.Page)
             .WithMany(p => p.SchemaVersions)
             .HasForeignKey(psv => psv.PageId)
             .OnDelete(DeleteBehavior.Cascade); // Delete versions if page deleted

            // CreatedBy relationship (optional)
            e.HasOne(psv => psv.CreatedByUser)
             .WithMany()
             .HasForeignKey(psv => psv.CreatedByUserId)
             .OnDelete(DeleteBehavior.SetNull)
             .IsRequired(false);

            // PageSchema as owned entity (JSON column)
            e.OwnsOne(psv => psv.PageSchema, schema =>
            {

                schema.Property(s => s.Root)
                      .HasConversion(
                          v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                          v => JsonSerializer.Deserialize<ElementNode>(v, (JsonSerializerOptions)null));
            });

            // Indexes
            e.HasIndex(psv => new { psv.PageId, psv.Version }).IsUnique(); // Version unique per page
            e.HasIndex(psv => psv.IsPublished);
            e.HasIndex(psv => psv.CreatedOn);

            // Constraints
            e.Property(psv => psv.Version).IsRequired();
        });

        // ===== SITE MEMBER (if you have this entity) =====
        modelBuilder.Entity<SiteMember>(e =>
        {
            // Site relationship
            e.HasOne(sm => sm.Site)
             .WithMany(s => s.Members)
             .HasForeignKey(sm => sm.SiteId)
             .OnDelete(DeleteBehavior.Cascade);

            // User relationship
            e.HasOne(sm => sm.User)
             .WithMany()
             .HasForeignKey(sm => sm.UserId)
             .OnDelete(DeleteBehavior.Cascade);

            // Enum as string
            e.Property(sm => sm.Role)
             .HasConversion<string>()
             .HasMaxLength(50)
             .IsRequired();

            // Indexes
            e.HasIndex(sm => new { sm.SiteId, sm.UserId }).IsUnique(); // User can only be member once
            e.HasIndex(sm => sm.UserId);
        });

    }
}
