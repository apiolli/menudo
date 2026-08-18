using Menudo.Application.DTOs.Expense;

public class PaginationExpenseDTO
{
        public List<ExpenseDTO> Items { get; set; } = [];
        public int TotalItems {get; set;}
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages {get; set; }
        
    
}