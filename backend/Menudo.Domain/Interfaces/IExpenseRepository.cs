using Menudo.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Interfaces
{
    public interface IExpenseRepository : IBaseRepository<Expense>
    {
        Task<IQueryable<Expense>> GetQueryableExpensesAsync();
    }
}
