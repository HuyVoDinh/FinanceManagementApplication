using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinancialManagementApplication.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Migration260529_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssetType",
                table: "Portfolio");

            migrationBuilder.AddColumn<int>(
                name: "AssetType",
                table: "PortfolioAllocations",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssetType",
                table: "PortfolioAllocations");

            migrationBuilder.AddColumn<int>(
                name: "AssetType",
                table: "Portfolio",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
