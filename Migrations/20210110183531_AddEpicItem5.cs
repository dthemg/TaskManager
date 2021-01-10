using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.Migrations
{
    public partial class AddEpicItem5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "EpicItemId",
                table: "TaskItems",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EpicItemId",
                table: "TaskItems");
        }
    }
}
