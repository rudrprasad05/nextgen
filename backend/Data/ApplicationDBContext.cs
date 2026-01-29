using System.Text.Json;
using Backend.Models;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<AppUser>
{
    public ApplicationDbContext(DbContextOptions options) : base(options) { }

    // Identity
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Media> Medias { get; set; }

    // Access control
    public DbSet<Capability> Capabilities { get; set; }
    public DbSet<UserCapability> UserCapabilities { get; set; }
    public DbSet<AccessContext> AccessContexts { get; set; }

    // Sites / Pages
    public DbSet<Site> Sites { get; set; }
    public DbSet<SiteUser> SiteUsers { get; set; }
    public DbSet<Page> Pages { get; set; }

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
                NormalizedName = "ADMIN"
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
            e.HasOne(m => m.Owner)
             .WithMany(u => u.Media)
             .HasForeignKey(m => m.OwnerId)
             .OnDelete(DeleteBehavior.Cascade);

            e.HasIndex(m => m.IsDeleted);
            e.HasIndex(m => m.CreatedOn);
        });

        // -----------------------------
        // Capability
        // -----------------------------

        modelBuilder.Entity<Capability>(e =>
        {
            e.HasKey(c => c.Key);
            e.HasIndex(c => c.Key).IsUnique();
        });

        modelBuilder.Entity<UserCapability>(e =>
        {
            e.HasOne(uc => uc.User)
             .WithMany(u => u.Capabilities)
             .HasForeignKey(uc => uc.UserId)
             .OnDelete(DeleteBehavior.Cascade);

            e.HasIndex(uc => new { uc.UserId, uc.CapabilityKey, uc.ScopeType, uc.ScopeId })
             .IsUnique();
        });

        modelBuilder.Entity<AccessContext>(e =>
        {
            e.HasOne(ac => ac.User)
             .WithMany(u => u.AccessContexts)
             .HasForeignKey(ac => ac.UserId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        // -----------------------------
        // Site
        // -----------------------------

        modelBuilder.Entity<Site>(e =>
        {
            e.HasOne(s => s.Owner)
             .WithMany(u => u.OwnedSites)
             .HasForeignKey(s => s.OwnerId)
             .OnDelete(DeleteBehavior.Restrict);

            e.HasIndex(s => s.Slug).IsUnique();
        });

        modelBuilder.Entity<SiteUser>(e =>
        {
            e.HasOne(su => su.User)
                .WithMany(u => u.Sites)   // user knows which sites they are associated with
                .HasForeignKey(su => su.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            e.HasOne(su => su.Site)
                .WithMany()  // <-- no navigation on Site
                .HasForeignKey(su => su.SiteId)
                .OnDelete(DeleteBehavior.Cascade);

            e.HasIndex(su => new { su.SiteId, su.UserId }).IsUnique();
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

            // JSON column
            e.Property(p => p.Schema)
             .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                v => JsonSerializer.Deserialize<PageSchema>(v, (JsonSerializerOptions)null)!
             );
        });
    }
}
