using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.Migrations
{
    public partial class AddEpicItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_TaskItems_EpicItemId",
                table: "TaskItems",
                column: "EpicItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskItems_EpicItems_EpicItemId",
                table: "TaskItems",
                column: "EpicItemId",
                principalTable: "EpicItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskItems_EpicItems_EpicItemId",
                table: "TaskItems");

            migrationBuilder.DropIndex(
                name: "IX_TaskItems_EpicItemId",
                table: "TaskItems");
        }
    }
}
