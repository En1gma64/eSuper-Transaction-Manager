using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Esuper.Data.Migrations
{
    /// <inheritdoc />
    public partial class SecondMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BankTransactions",
                columns: table => new
                {
                    transactionID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    accountNumber = table.Column<long>(type: "INTEGER", nullable: false),
                    date = table.Column<string>(type: "TEXT", nullable: false),
                    narration = table.Column<string>(type: "TEXT", nullable: false),
                    amount = table.Column<int>(type: "INTEGER", nullable: false),
                    balance = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankTransactions", x => x.transactionID);
                });

            migrationBuilder.InsertData(
                table: "BankTransactions",
                columns: new[] { "transactionID", "accountNumber", "amount", "balance", "date", "narration" },
                values: new object[,]
                {
                    { 1, 59685221L, 100, 100, "1/07/2022", "deposit" },
                    { 3, 86322156L, 300, 300, "3/07/2022", "deposit" },
                    { 4, 59685221L, 200, 300, "4/07/2022", "interest" },
                    { 5, 68525896L, 100, 200, "5/07/2022", "transfer in" },
                    { 6, 86322156L, 100, 400, "6/07/2022", "salary" },
                    { 7, 59685221L, -50, 250, "7/07/2022", "withdrawl" },
                    { 8, 68525896L, -20, 200, "8/07/2022", "bank charge" },
                    { 10, 59685221L, -100, 150, "10/07/2022", "withdrawl" },
                    { 11, 68525896L, -100, 200, "11/07/2022", "eftpos payment" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BankTransactions");
        }
    }
}
