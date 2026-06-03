using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinancialManagementApplication.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddDescriptionToDebt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Debts",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Debts");
        }
    }
}
