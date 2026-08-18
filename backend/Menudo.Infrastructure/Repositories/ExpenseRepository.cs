using Menudo.Domain.Entities;
using Menudo.Domain.Interfaces;
using Menudo.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Menudo.Infrastructure.Repositories
{
    public class ExpenseRepository : BaseRepository<Expense>, IExpenseRepository
    {
        public ExpenseRepository(MenudoDbContext context) : base(context)
        {
        }

        public int GetCountByMonth(int year, int month)
        {
            return _dbSet.Where(e => e.Date.Month == month && e.Date.Year == year)
                .Count();
        }

        public Expense? GetHighestExpenseByMonth(int year, int month)
        {
            return _dbSet.Where(e => e.Date.Month == month && e.Date.Year == year)
                    .OrderByDescending(x => x.Amount)
                    .FirstOrDefault();
        }

        public List<Expense> GetLastMovements(int count)
        {
            return _dbSet.OrderByDescending(x => x.Date).Take(count).ToList();
        }

        public decimal GetTotalByMonth(int year, int month)
        {
            return _dbSet.Where(e => e.Date.Month == month && e.Date.Year == year)
                .Sum(e => e.Amount);
        }

        public async Task<List<Expense>?> GetAllAsync(Guid id)
        {
            return await _dbSet.Where(x => x.UserId.Equals(id)).Include(x => x.Category)
                .Include(x => x.PaymentMethod)
                .ToListAsync();
        }

    }
}
