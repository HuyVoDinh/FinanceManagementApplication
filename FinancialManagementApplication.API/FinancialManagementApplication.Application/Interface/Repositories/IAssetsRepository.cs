using FinancialManagementApplication.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace FinancialManagementApplication.Application.Interface.Repositories
{
    public interface IAssetsRepository
    {
        Task <Assets> GetAsync (Guid id);
        Task<IEnumerable<Assets>> GetAllByAccountIdAsync (Guid accountId);
        Task <Assets> CreateAsync (Assets asset);
        Task <Assets> UpdateAsync (Assets asset);
        Task <bool> DeleteAsync (Guid id);
    }
}
