using System;
using System.Collections.Generic;
using System.Text;

namespace FinancialManagementApplication.Application.DTOs.Expense
{
    public class ExpenseDTO
    {
        public Guid ExpenseID { get; set; }
        public string Name { get; set; } = default!;
        public decimal Amount { get; set; }
        public Guid CategoryID { get; set; }
        public Guid AccountID { get; set; }
        public DateTime CreateAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
