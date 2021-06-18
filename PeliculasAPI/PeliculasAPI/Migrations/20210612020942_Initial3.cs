using Microsoft.EntityFrameworkCore.Migrations;

namespace PeliculasAPI.Migrations
{
    public partial class Initial3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PeliculasCines_Cines_CineId",
                table: "PeliculasCines");

            migrationBuilder.AddForeignKey(
                name: "FK_PeliculasCines_Cines_CineId",
                table: "PeliculasCines",
                column: "CineId",
                principalTable: "Cines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PeliculasCines_Cines_CineId",
                table: "PeliculasCines");

            migrationBuilder.AddForeignKey(
                name: "FK_PeliculasCines_Cines_CineId",
                table: "PeliculasCines",
                column: "CineId",
                principalTable: "Cines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
