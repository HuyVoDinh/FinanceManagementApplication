using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinancialManagementApplication.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class TenMigrationMoi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssetType",
                table: "Portfolio",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Assets",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssetType",
                table: "Portfolio");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Assets");
        }
    }
}
