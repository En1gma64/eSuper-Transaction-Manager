using Esuper.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace Esuper.Data.Repositories
{
    internal static class RawBankTransactionsRepository
    {



        internal async static Task<List<Transaction>> GetTransactionsAsync()
        {
            using (var db = new RawDBContext())
            {
                return await db.RawBankTransactions.ToListAsync();
            }
        }

        internal async static Task<Transaction> GetTransactionByIdAsync(int transactionID)
        {
            using (var db = new RawDBContext())
            {
                return await db.RawBankTransactions.FirstOrDefaultAsync(transaction => transaction.transactionID == transactionID);
            }
        }

        internal async static Task<List<Transaction>> GetTransactionByAccountNumberAsync(int accountNumber)
        {
            using (var db = new RawDBContext())
            {
                return await db.RawBankTransactions.Where(predicate: transaction => transaction.accountNumber == accountNumber).ToListAsync();
            }
        }

        internal async static Task<int> GetBalanceByAccountNumberAsync(int accountNumber)
        {
            using (var db = new RawDBContext())
            {
                Transaction returnTransaction = await db.RawBankTransactions.OrderBy(transaction => transaction.date).LastAsync(predicate: transaction => transaction.accountNumber == accountNumber);
                return returnTransaction.balance;
            }
        }

        internal async static Task<bool> CreateTransactionAsync(Transaction transactionToCreate)
        {
            using (var db = new RawDBContext())
            {
                try
                {
                    await db.RawBankTransactions.AddAsync(transactionToCreate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> UpdateTransactionAsync(Transaction transactionToUpdate)
        {
            using (var db = new RawDBContext())
            {
                try
                {
                    db.RawBankTransactions.Update(transactionToUpdate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        internal async static Task<bool> DeleteTransactionAsync(int transactionID)
        {
            using (var db = new RawDBContext())
            {
                try
                {
                    Transaction transactionToDelete = await GetTransactionByIdAsync(transactionID);

                    db.Remove(transactionToDelete);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
    }
}
