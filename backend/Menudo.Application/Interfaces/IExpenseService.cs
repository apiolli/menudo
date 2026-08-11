using Menudo.Application.DTOs.Expense;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.Interfaces
{
    public interface IExpenseService
    {
        Task<ExpenseDTO> CreateExpenseAsync(CreateExpenseDTO dto);
        Task<IEnumerable<ExpenseDTO>> GetAllExpensesAsync();
        Task<ExpenseDTO> GetExpenseById(int id);
        Task UpdateExpenseAsync(int id, UpdateExpenseDTO dto);
        Task DeleteExpenseAsync(int id);
    }
}
