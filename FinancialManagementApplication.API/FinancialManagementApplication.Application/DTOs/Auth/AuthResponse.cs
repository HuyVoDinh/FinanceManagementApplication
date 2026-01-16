using System;
using System.Collections.Generic;
using System.Text;

namespace FinancialManagementApplication.Application.DTOs.Auth
{
    public class AuthResponse
    {
        public Guid AccountId { get; set; }
        public string Email { get; set; } = default!;
        public string Token { get; set; } = default!;

    }
}
