using Menudo.Domain.Entities;
using Menudo.Domain.Interfaces;
using Menudo.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Menudo.Infrastructure.Repositories
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(MenudoDbContext context) : base(context) { }

        public async Task<List<Category>?> GetAllAsync(Guid id)
        {
            return await _dbSet.Where(x => x.UserId.Equals(id)).Include(x => x.Expenses).ToListAsync();
        }
    }
}
