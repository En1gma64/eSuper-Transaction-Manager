using Esuper.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace Esuper.Data
{
    internal sealed class RawDBContext : DbContext
    {
        public List<Transaction> ReadCSV()
        {
            string path = "DataBank\\RawBankData.csv";
            string[] csvLines = System.IO.File.ReadAllLines(path);

            var rawTransactions = new List<Transaction>();
            for (int i = 1; i < csvLines.Length; i++)
            {
                Transaction transaction = new Transaction();


                string[] data = csvLines[i].Split(',');

                //Parse data in attributes
                if (!String.IsNullOrEmpty(data[0]))
                    transaction.accountNumber = Convert.ToInt64(data[0]);
                else
                    transaction.accountNumber = 0;

                if (!String.IsNullOrEmpty(data[1]))
                    transaction.date = data[1];
                else
                    transaction.date = "Not Found";

                if (!String.IsNullOrEmpty(data[2]))
                    transaction.narration = data[2];
                else
                    transaction.narration = "Not Found";

                if (!String.IsNullOrEmpty(data[3]))
                    transaction.amount = Convert.ToInt32(data[3]);
                else
                    transaction.amount = 0;

                if (!String.IsNullOrEmpty(data[4]))
                    transaction.balance = Convert.ToInt32(data[4]);
                else
                    transaction.balance = -200;

                transaction.transactionID = i;
                rawTransactions.Add(transaction);
            }

            return rawTransactions;
        }

        public DbSet<Transaction> RawBankTransactions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            List<Transaction> transactionsToSeed = ReadCSV();

            modelBuilder.Entity<Transaction>().HasData(transactionsToSeed);
        }
    }
}
