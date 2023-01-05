using Esuper.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace Esuper.Data.Repositories
{
    internal static class BankTransactionRepository
    {
        internal async static Task<List<Transaction>> GetTransactionsAsync()
        {
            using (var db = new BankDBContext())
            {
                return await db.BankTransactions.ToListAsync();
            }
        }

        internal async static Task<Transaction> GetTransactionByIdAsync(int transactionID)
        {
            using (var db = new BankDBContext())
            {
                return await db.BankTransactions.FirstOrDefaultAsync(transaction => transaction.transactionID == transactionID);
            }
        }

        internal async static Task<List<Transaction>> GetTransactionByAccountNumberAsync(int accountNumber)
        {
            using (var db = new BankDBContext())
            {
                return await db.BankTransactions.Where(predicate: transaction => transaction.accountNumber == accountNumber).ToListAsync();
            }
        }

        internal async static Task<Transaction> GetBalanceByAccountNumberAsync(int accountNumber)
        {
            using (var db = new BankDBContext())
            {
                Transaction returnTransaction = await db.BankTransactions.OrderBy(transaction => transaction.date).LastAsync(predicate: transaction => transaction.accountNumber == accountNumber);
                return returnTransaction;
            }
        }

        internal async static Task<bool> CreateTransactionAsync(Transaction transactionToCreate)
        {
            using (var db = new BankDBContext())
            {

                //Validate new transaction
                bool validTransaction = true;
                if (transactionToCreate.accountNumber == 0)
                    validTransaction = false;
                if (String.IsNullOrEmpty(transactionToCreate.date))
                    validTransaction = false;
                if (String.IsNullOrEmpty(transactionToCreate.narration)) 
                    validTransaction = false;
                if (transactionToCreate.balance <= 0)
                    validTransaction = false;
                if (transactionToCreate.amount == 0)
                    validTransaction = false;

                if (validTransaction)
                {
                    try
                    {
                        await db.BankTransactions.AddAsync(transactionToCreate);

                        return await db.SaveChangesAsync() >= 1;
                    }
                    catch (Exception e)
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
                
            }
        }

        internal async static Task<bool> UpdateTransactionAsync(Transaction transactionToUpdate)
        {
            using (var db = new BankDBContext())
            {
                try
                {
                    db.BankTransactions.Update(transactionToUpdate);

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
            using (var db = new BankDBContext())
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
