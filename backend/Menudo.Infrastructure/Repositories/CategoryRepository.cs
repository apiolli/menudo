using Menudo.Domain.Entities;
using Menudo.Domain.Interfaces;
using Menudo.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Menudo.Infrastructure.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(MenudoDbContext context) : base(context) { }

        public new async Task<List<Category>> GetAllAsync()
        {
            return await _dbSet.Include(x => x.Expenses).ToListAsync();
        }
    }
}
