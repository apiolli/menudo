using AutoMapper;
using Menudo.Application.DTOs.Category;
using Menudo.Application.DTOs.Dashboard;
using Menudo.Application.DTOs.Expense;
using Menudo.Application.Interfaces;
using Menudo.Domain.Entities;
using Menudo.Domain.Interfaces;
using System.Globalization;

namespace Menudo.Application.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IExpenseRepository _repo;
        private readonly IMapper mapper;

        public DashboardService(IExpenseRepository repo, IMapper mapper)
        {
            _repo = repo;
            this.mapper = mapper;
        }

        public DashboardDTO GetDashboardData()
        {
            var now = DateTime.Now;
            var lastMonth = now.AddMonths(-1);
            var monthTotal = _repo.GetTotalByMonth(now.Year, now.Month);
            var lastMonthTotal = _repo.GetTotalByMonth(lastMonth.Year, lastMonth.Month);
            var movements = _repo.GetCountByMonth(now.Year, now.Month);

            var highestExpense = _repo.GetHighestExpenseByMonth(now.Year, now.Month);
            var lastMovements = _repo.GetLastMovements(6);

            var percentajeChange = lastMonthTotal == 0 ? 0m
                : ((monthTotal - lastMonthTotal) / lastMonthTotal) * 100m;

            var movementsAverage = movements == 0 ? 0m : monthTotal / movements;

            var expenses = _repo.GetQueryable();
            var spendingByCategory = GetSpendingByCategory(now.Year, now.Month, expenses);
            var evolutionOverLast6Months = GetEvolutionOverTheLast6Months(expenses);

            // Mapeo de entidades
            var highestExpenseDto = mapper.Map<ExpenseSummaryDTO>(highestExpense);
            var lastMovementsDto = mapper.Map<List<ExpenseDTO>>(lastMovements);

            return new DashboardDTO
            {
                MonthTotal = monthTotal,
                LastMonthTotal = lastMonthTotal,
                PercentajeChange = Math.Round(percentajeChange, 1),
                Movements = movements,
                MovementsAverage = Math.Round(movementsAverage, 2),
                HighestExpense = highestExpenseDto,
                EvolutionOverTheLast6Months = evolutionOverLast6Months,
                SpendingByCategory = spendingByCategory,
                LastMovements = lastMovementsDto,
            };
        }

        private List<TotalSpentPerMonthDTO> GetEvolutionOverTheLast6Months(IQueryable<Expense> allExpenses)
        {
            var today = DateTime.Now;
            var result = new List<TotalSpentPerMonthDTO>();

            for (int i = 5; i >= 0; i--)
            {
                var date = today.AddMonths(-i);
                result.Add(new TotalSpentPerMonthDTO
                {
                    Month = date.ToString("MMM", new CultureInfo("es-AR")),
                    Year = date.Year,
                    MonthNumber = date.Month,
                    Total = _repo.GetTotalByMonth(date.Year, date.Month),
                });
            }

            return result;
        }

         private List<SpendingByCategoryDTO> GetSpendingByCategory(int year, int month, IQueryable<Expense> expenses)
        {
            return expenses
                .Where(e => e.Date.Year == year && e.Date.Month == month)
                .GroupBy(e => e.Category)
                .Select(e => new SpendingByCategoryDTO
                {
                    Name = e.Key!.Name,
                    Spend = e.Sum(e => e.Amount)

                }).ToList();
        }
    }
}
