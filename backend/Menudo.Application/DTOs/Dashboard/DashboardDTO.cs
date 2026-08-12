using Menudo.Application.DTOs.Category;
using Menudo.Application.DTOs.Expense;

namespace Menudo.Application.DTOs.Dashboard
{
    public record DashboardDTO
    {
        public decimal MonthTotal { get; set; }
        public decimal LastMonthTotal {  get; set; }
        public decimal PercentajeChange { get; set; }
        public int Movements { get; set; }
        public decimal MovementsAverage { get; set; }
        public ExpenseSummaryDTO HighestExpense { get; set; } = new();
        public List<TotalSpentPerMonthDTO> EvolutionOverTheLast6Months { get; set; } = [];
        public List<SpendingByCategoryDTO> SpendingByCategory { get; set; } = [];
        public List<ExpenseDTO> LastMovements { get; set; } = [];
    }
}
