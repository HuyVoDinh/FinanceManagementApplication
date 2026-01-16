using FinanceManagementApplication.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Text;

namespace FinanceManagementApplication.Application.Interface.Repositories
{
    public interface IAccountRepository
    {
        Task<Account?> GetByEmailAsync(string email);
        Task AddAsync(Account account);
    }
}
