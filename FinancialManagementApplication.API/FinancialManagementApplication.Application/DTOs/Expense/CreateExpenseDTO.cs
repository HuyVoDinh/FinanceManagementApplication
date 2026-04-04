using FinanceManagementApplication.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace FinancialManagementApplication.Application.DTOs.Expense
{
    public class CreateExpenseDTO
    {
        public Guid ExpenseID { get; set; }
        public string Name { get; set; } = default!;
        public decimal Amount { get; set; }
        public Guid CategoryID { get; set; }
        public Guid AccountID { get; set; }
        public Account Account { get; set; } = default!;
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
