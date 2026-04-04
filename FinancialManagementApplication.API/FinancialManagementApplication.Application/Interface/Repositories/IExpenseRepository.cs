using FinancialManagementApplication.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace FinancialManagementApplication.Application.Interface.Repositories
{
    public interface IExpenseRepository
    {
        public Task<Expense?> GetExpenseByIDAsync(Guid id);
        public Task<IEnumerable<Expense>> GetAllExpensesAsync();
        public Task<Expense?> GetExpenseByAccountIDAsync(Guid accountID);
        public Task<Expense?> GetByCategoryIDAsync(Guid categoryID);
        public Task<Expense?> CreateExpenseAsync(Expense expense);
        public Task<Expense?> UpdateExpenseAsync(Expense expense);
        public Task<bool> DeleteExpenseAsync(Guid id);
    }
}
