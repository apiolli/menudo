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
    Task<PaginationExpenseDTO> FilterExpensesAsync(FilterExpenseDTO dto);
    Task<ExpenseExportDTO> ExportExpensesAsync(ExportFormat format, FilterExpenseDTO? filter = null);
}
}
