using FinanceManagementApplication.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace FinancialManagementApplication.Application.DTOs.Category
{
    public class CategoryDTO
    {
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public float AllocatedPercentage { get; set; }
        public Guid AccountID { get; set; }
    }
}
