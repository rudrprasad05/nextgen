using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class SS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ScreenshotId",
                table: "Sites",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Sites_ScreenshotId",
                table: "Sites",
                column: "ScreenshotId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sites_Medias_ScreenshotId",
                table: "Sites",
                column: "ScreenshotId",
                principalTable: "Medias",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sites_Medias_ScreenshotId",
                table: "Sites");

            migrationBuilder.DropIndex(
                name: "IX_Sites_ScreenshotId",
                table: "Sites");

            migrationBuilder.DropColumn(
                name: "ScreenshotId",
                table: "Sites");
        }
    }
}
