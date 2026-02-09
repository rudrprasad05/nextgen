using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class MajorChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Medias_ProfilePictureId1",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Medias_AspNetUsers_OwnerId",
                table: "Medias");

            migrationBuilder.DropForeignKey(
                name: "FK_Sites_Medias_ScreenshotId",
                table: "Sites");

            migrationBuilder.DropTable(
                name: "AccessContexts");

            migrationBuilder.DropTable(
                name: "Capabilities");

            migrationBuilder.DropTable(
                name: "SiteUsers");

            migrationBuilder.DropTable(
                name: "UserCapabilities");

            migrationBuilder.DropIndex(
                name: "IX_Medias_IsDeleted",
                table: "Medias");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ProfilePictureId1",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Sites");

            migrationBuilder.DropColumn(
                name: "Schema",
                table: "Pages");

            migrationBuilder.DropColumn(
                name: "ProfilePictureId1",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Pages",
                newName: "MetaData");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Medias",
                newName: "UploadedByUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Medias_OwnerId",
                table: "Medias",
                newName: "IX_Medias_UploadedByUserId");

            migrationBuilder.AddColumn<bool>(
                name: "IsPublic",
                table: "Sites",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsPublished",
                table: "Sites",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "OrganizationId",
                table: "Sites",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "CurrentSchemaVersionId",
                table: "Pages",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "Url",
                table: "Medias",
                type: "varchar(2048)",
                maxLength: 2048,
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "ObjectKey",
                table: "Medias",
                type: "varchar(500)",
                maxLength: 500,
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "FileName",
                table: "Medias",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "ContentType",
                table: "Medias",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Medias",
                type: "varchar(255)",
                nullable: true,
                collation: "utf8mb4_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "OrganizationId",
                table: "Medias",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProfilePictureId",
                table: "AspNetUsers",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci",
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsPlatformAdmin",
                table: "AspNetUsers",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "Organizations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_general_ci"),
                    Slug = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_general_ci"),
                    SubscriptionId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MaxSites = table.Column<int>(type: "int", nullable: false),
                    MaxMembers = table.Column<int>(type: "int", nullable: false),
                    OwnerId = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_general_ci"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Organizations_AspNetUsers_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "PageSchemaVersions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    PageId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Version = table.Column<int>(type: "int", nullable: false),
                    PageSchema_Root = table.Column<string>(type: "longtext", nullable: false, collation: "utf8mb4_general_ci"),
                    IsPublished = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedByUserId = table.Column<string>(type: "varchar(255)", nullable: true, collation: "utf8mb4_general_ci"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PageSchemaVersions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PageSchemaVersions_AspNetUsers_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_PageSchemaVersions_Pages_PageId",
                        column: x => x.PageId,
                        principalTable: "Pages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "SiteMembers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    SiteId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_general_ci"),
                    Role = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_general_ci"),
                    GrantedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    GrantedBy = table.Column<string>(type: "longtext", nullable: true, collation: "utf8mb4_general_ci"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SiteMembers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SiteMembers_Sites_SiteId",
                        column: x => x.SiteId,
                        principalTable: "Sites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "SubscriptionPlans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false, collation: "utf8mb4_general_ci"),
                    Slug = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false, collation: "utf8mb4_general_ci"),
                    Description = table.Column<string>(type: "longtext", nullable: false, collation: "utf8mb4_general_ci"),
                    MonthlyPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    YearlyPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Currency = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false, collation: "utf8mb4_general_ci"),
                    MaxSites = table.Column<int>(type: "int", nullable: false),
                    MaxMembers = table.Column<int>(type: "int", nullable: false),
                    MaxPagesPerSite = table.Column<int>(type: "int", nullable: false),
                    MaxStorageMB = table.Column<long>(type: "bigint", nullable: false),
                    MaxCustomDomains = table.Column<int>(type: "int", nullable: false),
                    HasCustomDomain = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    HasAnalytics = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    HasAdvancedComponents = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    HasApiAccess = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    HasPrioritySupport = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    HasWhiteLabel = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    HasCollaboration = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    HasVersionHistory = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    HasExport = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsPublic = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DeprecatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubscriptionPlans", x => x.Id);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "Invitations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    OrgRole = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_general_ci"),
                    SiteId = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    SiteRole = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_general_ci"),
                    InvitedByUserId = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_general_ci"),
                    MyProperty = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false, collation: "utf8mb4_general_ci"),
                    AcceptedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ExpiresAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Token = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Status = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_general_ci"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invitations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invitations_AspNetUsers_InvitedByUserId",
                        column: x => x.InvitedByUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Invitations_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Invitations_Sites_SiteId",
                        column: x => x.SiteId,
                        principalTable: "Sites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "OrganizationMembers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Role = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_general_ci"),
                    JoinedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    InvitedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IsActive = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_general_ci"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationMembers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrganizationMembers_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    OrganizationId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    PlanId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Interval = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_general_ci"),
                    Status = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_general_ci"),
                    StartDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CurrentPeriodStart = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CurrentPeriodEnd = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    CancelledAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    TrialEndsAt = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ExternalSubscriptionId = table.Column<string>(type: "varchar(255)", nullable: true, collation: "utf8mb4_general_ci"),
                    ExternalCustomerId = table.Column<string>(type: "longtext", nullable: true, collation: "utf8mb4_general_ci"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subscriptions_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Subscriptions_SubscriptionPlans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "SubscriptionPlans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Sites_OrganizationId",
                table: "Sites",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Sites_OrganizationId_Slug",
                table: "Sites",
                columns: new[] { "OrganizationId", "Slug" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pages_CurrentSchemaVersionId",
                table: "Pages",
                column: "CurrentSchemaVersionId");

            migrationBuilder.CreateIndex(
                name: "IX_Medias_AppUserId",
                table: "Medias",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Medias_ObjectKey",
                table: "Medias",
                column: "ObjectKey",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Medias_OrganizationId",
                table: "Medias",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ProfilePictureId",
                table: "AspNetUsers",
                column: "ProfilePictureId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_Email",
                table: "Invitations",
                column: "Email");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_InvitedByUserId",
                table: "Invitations",
                column: "InvitedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_OrganizationId_Email_Status",
                table: "Invitations",
                columns: new[] { "OrganizationId", "Email", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_SiteId",
                table: "Invitations",
                column: "SiteId");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_Status",
                table: "Invitations",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_Token",
                table: "Invitations",
                column: "Token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationMembers_IsActive",
                table: "OrganizationMembers",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationMembers_OrganizationId_UserId",
                table: "OrganizationMembers",
                columns: new[] { "OrganizationId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationMembers_UserId",
                table: "OrganizationMembers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Organizations_OwnerId",
                table: "Organizations",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Organizations_Slug",
                table: "Organizations",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PageSchemaVersions_CreatedByUserId",
                table: "PageSchemaVersions",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PageSchemaVersions_CreatedOn",
                table: "PageSchemaVersions",
                column: "CreatedOn");

            migrationBuilder.CreateIndex(
                name: "IX_PageSchemaVersions_IsPublished",
                table: "PageSchemaVersions",
                column: "IsPublished");

            migrationBuilder.CreateIndex(
                name: "IX_PageSchemaVersions_PageId_Version",
                table: "PageSchemaVersions",
                columns: new[] { "PageId", "Version" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SiteMembers_SiteId_UserId",
                table: "SiteMembers",
                columns: new[] { "SiteId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SiteMembers_UserId",
                table: "SiteMembers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionPlans_IsActive",
                table: "SubscriptionPlans",
                column: "IsActive");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionPlans_IsPublic",
                table: "SubscriptionPlans",
                column: "IsPublic");

            migrationBuilder.CreateIndex(
                name: "IX_SubscriptionPlans_Slug",
                table: "SubscriptionPlans",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_ExternalSubscriptionId",
                table: "Subscriptions",
                column: "ExternalSubscriptionId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_OrganizationId",
                table: "Subscriptions",
                column: "OrganizationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_OrganizationId_Status",
                table: "Subscriptions",
                columns: new[] { "OrganizationId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_PlanId",
                table: "Subscriptions",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_Status",
                table: "Subscriptions",
                column: "Status");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Medias_ProfilePictureId",
                table: "AspNetUsers",
                column: "ProfilePictureId",
                principalTable: "Medias",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_AspNetUsers_AppUserId",
                table: "Medias",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_AspNetUsers_UploadedByUserId",
                table: "Medias",
                column: "UploadedByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_Organizations_OrganizationId",
                table: "Medias",
                column: "OrganizationId",
                principalTable: "Organizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pages_PageSchemaVersions_CurrentSchemaVersionId",
                table: "Pages",
                column: "CurrentSchemaVersionId",
                principalTable: "PageSchemaVersions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sites_Medias_ScreenshotId",
                table: "Sites",
                column: "ScreenshotId",
                principalTable: "Medias",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Sites_Organizations_OrganizationId",
                table: "Sites",
                column: "OrganizationId",
                principalTable: "Organizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Medias_ProfilePictureId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Medias_AspNetUsers_AppUserId",
                table: "Medias");

            migrationBuilder.DropForeignKey(
                name: "FK_Medias_AspNetUsers_UploadedByUserId",
                table: "Medias");

            migrationBuilder.DropForeignKey(
                name: "FK_Medias_Organizations_OrganizationId",
                table: "Medias");

            migrationBuilder.DropForeignKey(
                name: "FK_Pages_PageSchemaVersions_CurrentSchemaVersionId",
                table: "Pages");

            migrationBuilder.DropForeignKey(
                name: "FK_Sites_Medias_ScreenshotId",
                table: "Sites");

            migrationBuilder.DropForeignKey(
                name: "FK_Sites_Organizations_OrganizationId",
                table: "Sites");

            migrationBuilder.DropTable(
                name: "Invitations");

            migrationBuilder.DropTable(
                name: "OrganizationMembers");

            migrationBuilder.DropTable(
                name: "PageSchemaVersions");

            migrationBuilder.DropTable(
                name: "SiteMembers");

            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DropTable(
                name: "Organizations");

            migrationBuilder.DropTable(
                name: "SubscriptionPlans");

            migrationBuilder.DropIndex(
                name: "IX_Sites_OrganizationId",
                table: "Sites");

            migrationBuilder.DropIndex(
                name: "IX_Sites_OrganizationId_Slug",
                table: "Sites");

            migrationBuilder.DropIndex(
                name: "IX_Pages_CurrentSchemaVersionId",
                table: "Pages");

            migrationBuilder.DropIndex(
                name: "IX_Medias_AppUserId",
                table: "Medias");

            migrationBuilder.DropIndex(
                name: "IX_Medias_ObjectKey",
                table: "Medias");

            migrationBuilder.DropIndex(
                name: "IX_Medias_OrganizationId",
                table: "Medias");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ProfilePictureId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IsPublic",
                table: "Sites");

            migrationBuilder.DropColumn(
                name: "IsPublished",
                table: "Sites");

            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "Sites");

            migrationBuilder.DropColumn(
                name: "CurrentSchemaVersionId",
                table: "Pages");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "IsPlatformAdmin",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "MetaData",
                table: "Pages",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "UploadedByUserId",
                table: "Medias",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Medias_UploadedByUserId",
                table: "Medias",
                newName: "IX_Medias_OwnerId");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Sites",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Schema",
                table: "Pages",
                type: "longtext",
                nullable: false,
                collation: "utf8mb4_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "Url",
                table: "Medias",
                type: "longtext",
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "varchar(2048)",
                oldMaxLength: 2048)
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "ObjectKey",
                table: "Medias",
                type: "longtext",
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "varchar(500)",
                oldMaxLength: 500)
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "FileName",
                table: "Medias",
                type: "longtext",
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255)
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "ContentType",
                table: "Medias",
                type: "longtext",
                nullable: false,
                collation: "utf8mb4_general_ci",
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldMaxLength: 100)
                .OldAnnotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.AlterColumn<int>(
                name: "ProfilePictureId",
                table: "AspNetUsers",
                type: "int",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "char(36)",
                oldNullable: true)
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "ProfilePictureId1",
                table: "AspNetUsers",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateTable(
                name: "AccessContexts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_general_ci"),
                    AllowedIps = table.Column<string>(type: "longtext", nullable: true, collation: "utf8mb4_general_ci"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DeniedIps = table.Column<string>(type: "longtext", nullable: true, collation: "utf8mb4_general_ci"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    ValidFrom = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ValidUntil = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessContexts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccessContexts_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "Capabilities",
                columns: table => new
                {
                    Key = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_general_ci"),
                    Description = table.Column<string>(type: "longtext", nullable: false, collation: "utf8mb4_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Capabilities", x => x.Key);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "SiteUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    SiteId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_general_ci"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SiteUsers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SiteUsers_Sites_SiteId",
                        column: x => x.SiteId,
                        principalTable: "Sites",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateTable(
                name: "UserCapabilities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_general_ci"),
                    CapabilityKey = table.Column<string>(type: "varchar(255)", nullable: false, collation: "utf8mb4_general_ci"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ScopeId = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    ScopeType = table.Column<int>(type: "int", nullable: false),
                    UpdatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCapabilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserCapabilities_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("Relational:Collation", "utf8mb4_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Medias_IsDeleted",
                table: "Medias",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ProfilePictureId1",
                table: "AspNetUsers",
                column: "ProfilePictureId1");

            migrationBuilder.CreateIndex(
                name: "IX_AccessContexts_UserId",
                table: "AccessContexts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Capabilities_Key",
                table: "Capabilities",
                column: "Key",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SiteUsers_SiteId_UserId",
                table: "SiteUsers",
                columns: new[] { "SiteId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SiteUsers_UserId",
                table: "SiteUsers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserCapabilities_UserId_CapabilityKey_ScopeType_ScopeId",
                table: "UserCapabilities",
                columns: new[] { "UserId", "CapabilityKey", "ScopeType", "ScopeId" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Medias_ProfilePictureId1",
                table: "AspNetUsers",
                column: "ProfilePictureId1",
                principalTable: "Medias",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_AspNetUsers_OwnerId",
                table: "Medias",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sites_Medias_ScreenshotId",
                table: "Sites",
                column: "ScreenshotId",
                principalTable: "Medias",
                principalColumn: "Id");
        }
    }
}
