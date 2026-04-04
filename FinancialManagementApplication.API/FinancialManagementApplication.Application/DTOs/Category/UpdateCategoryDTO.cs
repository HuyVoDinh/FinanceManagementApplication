using System;
using System.Collections.Generic;
using System.Text;

namespace FinancialManagementApplication.Application.DTOs.Category
{
    public class UpdateCategoryDTO
    {
        public Guid CategoryID { get; set; }
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public float AllocatedPercentage { get; set; }
        public DateTime UpdateAt { get; set; } = DateTime.UtcNow;
    }
}
