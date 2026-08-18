using Menudo.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Interfaces
{
    public interface IExpenseRepository : IBaseRepository<Expense>
    {
        decimal GetTotalByMonth(int year, int month);
        int GetCountByMonth(int year, int month);
        Expense? GetHighestExpenseByMonth(int year, int month);
        List<Expense> GetLastMovements(int count);
        Task<List<Expense>?> GetAllAsync(Guid id);
    }
}
