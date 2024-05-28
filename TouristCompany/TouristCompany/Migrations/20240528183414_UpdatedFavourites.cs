using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TouristCompany.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedFavourites : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Favourites",
                table: "Favourites");

            migrationBuilder.RenameTable(
                name: "Favourites",
                newName: "favourites");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "favourites",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "favourites",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "TourId",
                table: "favourites",
                newName: "tour_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_favourites",
                table: "favourites",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "IX_favourites_tour_id",
                table: "favourites",
                column: "tour_id");

            migrationBuilder.CreateIndex(
                name: "IX_favourites_user_id",
                table: "favourites",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_favourites_tours_tour_id",
                table: "favourites",
                column: "tour_id",
                principalTable: "tours",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_favourites_users_user_id",
                table: "favourites",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_favourites_tours_tour_id",
                table: "favourites");

            migrationBuilder.DropForeignKey(
                name: "FK_favourites_users_user_id",
                table: "favourites");

            migrationBuilder.DropPrimaryKey(
                name: "PK_favourites",
                table: "favourites");

            migrationBuilder.DropIndex(
                name: "IX_favourites_tour_id",
                table: "favourites");

            migrationBuilder.DropIndex(
                name: "IX_favourites_user_id",
                table: "favourites");

            migrationBuilder.RenameTable(
                name: "favourites",
                newName: "Favourites");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Favourites",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "Favourites",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "tour_id",
                table: "Favourites",
                newName: "TourId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Favourites",
                table: "Favourites",
                column: "Id");
        }
    }
}
