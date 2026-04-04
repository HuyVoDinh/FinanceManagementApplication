using System;
using System.Collections.Generic;
using System.Text;

namespace FinancialManagementApplication.Application.DTOs.Category
{
    public class CreateCategoryDTO
    {
        public Guid CategoryID { get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public float AllocatedPercentage { get; set; }
        public Guid AccountID { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.UtcNow;  
        public DateTime UpdateAt { get; set; } = DateTime.UtcNow;
    }
}
