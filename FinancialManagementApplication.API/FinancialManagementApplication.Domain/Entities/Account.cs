using System;
using System.Collections.Generic;
using System.Text;

namespace FinanceManagementApplication.Domain.Entities
{
    public class Account
    {
        public Guid AccountID { get; set; }
        public string email { get; set; }
        public string passwordHash { get; set; }    
        public DateTime CreateAt { get; set; }
    }
}
