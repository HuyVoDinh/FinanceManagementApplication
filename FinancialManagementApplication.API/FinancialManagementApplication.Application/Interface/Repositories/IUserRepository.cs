using FinanceManagementApplication.Domain.Entities;
using FinancialManagementApplication.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace FinancialManagementApplication.Application.Interface.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserByIdAsync(Guid id);
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User?> GetUserByAccountIDAsync(Guid id);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User> CreateUserAsync(User user);
        Task<User> UpdateUserAsync(User user);
        Task<bool> DeleteUserAsync(Guid id);
    }
}
