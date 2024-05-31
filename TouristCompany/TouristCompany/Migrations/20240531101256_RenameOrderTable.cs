using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TouristCompany.Migrations
{
    /// <inheritdoc />
    public partial class RenameOrderTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orders_m_tour_prices_tour_price_id",
                table: "orders_m");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_m_tours_tour_id",
                table: "orders_m");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_m_users_user_id",
                table: "orders_m");

            migrationBuilder.DropPrimaryKey(
                name: "PK_orders_m",
                table: "orders_m");

            migrationBuilder.RenameTable(
                name: "orders_m",
                newName: "orders");

            migrationBuilder.RenameIndex(
                name: "IX_orders_m_user_id",
                table: "orders",
                newName: "IX_orders_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_orders_m_tour_price_id",
                table: "orders",
                newName: "IX_orders_tour_price_id");

            migrationBuilder.RenameIndex(
                name: "IX_orders_m_tour_id",
                table: "orders",
                newName: "IX_orders_tour_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_orders",
                table: "orders",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_orders_tour_prices_tour_price_id",
                table: "orders",
                column: "tour_price_id",
                principalTable: "tour_prices",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orders_tours_tour_id",
                table: "orders",
                column: "tour_id",
                principalTable: "tours",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orders_users_user_id",
                table: "orders",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_orders_tour_prices_tour_price_id",
                table: "orders");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_tours_tour_id",
                table: "orders");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_users_user_id",
                table: "orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_orders",
                table: "orders");

            migrationBuilder.RenameTable(
                name: "orders",
                newName: "orders_m");

            migrationBuilder.RenameIndex(
                name: "IX_orders_user_id",
                table: "orders_m",
                newName: "IX_orders_m_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_orders_tour_price_id",
                table: "orders_m",
                newName: "IX_orders_m_tour_price_id");

            migrationBuilder.RenameIndex(
                name: "IX_orders_tour_id",
                table: "orders_m",
                newName: "IX_orders_m_tour_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_orders_m",
                table: "orders_m",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_orders_m_tour_prices_tour_price_id",
                table: "orders_m",
                column: "tour_price_id",
                principalTable: "tour_prices",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orders_m_tours_tour_id",
                table: "orders_m",
                column: "tour_id",
                principalTable: "tours",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orders_m_users_user_id",
                table: "orders_m",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
