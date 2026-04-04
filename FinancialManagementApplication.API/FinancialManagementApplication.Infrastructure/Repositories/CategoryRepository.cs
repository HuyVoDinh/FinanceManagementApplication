using FinancialManagementApplication.Application.Interface.Repositories;
using FinancialManagementApplication.Domain.Entities;
using FinancialManagementApplication.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace FinancialManagementApplication.Infrastructure.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Category> CreateCategoryAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<bool> DeleteCategoryAsync(Guid id)
        {
            await _context.Categories.Where(x => x.CategoryID == id).ExecuteDeleteAsync();
            await _context.SaveChangesAsync();
            return true;
        }

        public Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return _context.Categories.ToListAsync().ContinueWith(t => (IEnumerable<Category>)t.Result);
        }

        public Task<Category?> GetByAccountIDAsync(Guid accountId)
        {
            return _context.Categories.FirstOrDefaultAsync(x => x.AccountID == accountId);
        }

        public Task<Category?> GetCategoryByIdAsync(Guid id)
        {
            return _context.Categories.FirstOrDefaultAsync(x => x.CategoryID == id);
        }

        public async Task<Category> UpdateCategoryAsync(Category category)
        {
            await _context.Categories.Where(x => x.CategoryID == category.CategoryID).ExecuteUpdateAsync(x =>
                x.SetProperty(c => c.Name, category.Name)
                .SetProperty(c => c.Description, category.Description)
                .SetProperty(c => c.AllocatedPercentage, category.AllocatedPercentage)
                .SetProperty(c => c.UpdateAt, DateTime.UtcNow)
            );
            await _context.SaveChangesAsync();
            return category;
        }
    }
}
