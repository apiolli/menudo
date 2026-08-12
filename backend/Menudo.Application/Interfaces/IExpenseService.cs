using Menudo.Application.DTOs.Expense;

namespace Menudo.Application.Interfaces
{
    public interface IExpenseService
    {
        Task<ExpenseDTO> CreateExpenseAsync(CreateExpenseDTO dto);
        Task<IEnumerable<ExpenseDTO>> GetAllExpensesAsync();
        Task<ExpenseDTO> GetExpenseById(int id);
        Task UpdateExpenseAsync(int id, UpdateExpenseDTO dto);
        Task DeleteExpenseAsync(int id);
        Task<List<ExpenseDTO>> FilterExpensesAsync(FilterExpenseDTO dto);
    }
}
