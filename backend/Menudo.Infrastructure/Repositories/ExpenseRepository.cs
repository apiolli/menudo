using Menudo.Domain.Entities;
using Menudo.Domain.Interfaces;
using Menudo.Infrastructure.Persistence;

namespace Menudo.Infrastructure.Repositories
{
    public class ExpenseRepository : BaseRepository<Expense>, IExpenseRepository
    {
        public ExpenseRepository(MenudoDbContext context) : base(context)
        {
        }

        public async Task<IQueryable<Expense>> GetQueryableExpensesAsync() => _dbSet.AsQueryable();
    }
}
