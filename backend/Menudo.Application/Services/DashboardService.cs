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
            var expenses = _repo.GetQueryable();
            var actualMonthExpenses = expenses.Where(e => e.Date.Month == DateTime.Now.Month && e.Date.Year == DateTime.Now.Year);

            var monthTotal = actualMonthExpenses.Sum(e => e.Amount);

            var lastMonthTotal = expenses
                .Where(e => e.Date.Month == DateTime.Now.AddMonths(-1).Month)
                .Sum(e => e.Amount);

            var percentajeChange = ((monthTotal - lastMonthTotal) / lastMonthTotal) * 100m;

            var movements = actualMonthExpenses.Count();
            var movementsAverage = actualMonthExpenses.Average(e => e.Amount);

            var highestExpense = actualMonthExpenses
                .OrderByDescending(x => x.Amount)
                .Select(e => new ExpenseSummaryDTO
                    {
                        Id = e.Id,
                        Description = e.Description,
                        Amount = e.Amount,
                    })
                .FirstOrDefault();

            var evolutionOverLast6Months = GetEvolutionOverTheLast6Months(expenses);
            var spendingByCategory = GetSpendingByCategory(actualMonthExpenses);
            var lastMovements = mapper.Map<List<ExpenseDTO>>(actualMonthExpenses.Take(6).OrderByDescending(x => x.Date).ToList());

            return new DashboardDTO
            {
                MonthTotal = monthTotal,
                LastMonthTotal = lastMonthTotal,
                PercentajeChange = Math.Round(percentajeChange, 1),
                Movements = movements,
                MovementsAverage = Math.Round(movementsAverage, 2),
                HighestExpense = highestExpense!,
                EvolutionOverTheLast6Months = evolutionOverLast6Months,
                SpendingByCategory = spendingByCategory,
                LastMovements = lastMovements,
            };
        }

        private List<TotalSpentPerMonthDTO> GetEvolutionOverTheLast6Months(IQueryable<Expense> allExpenses)
        {
            var today = DateTime.Now;
            var result = new List<TotalSpentPerMonthDTO>();

            for (int i = 5; i >= 0; i--)
            {
                var date = today.AddMonths(-i);

                var total = allExpenses
                    .Where(e => e.Date.Year == date.Year && e.Date.Month == date.Month)
                    .Sum(e => e.Amount);

                result.Add(new TotalSpentPerMonthDTO
                {
                    Month = date.ToString("MMM", new CultureInfo("es-AR")),
                    Year = date.Year,
                    MonthNumber = date.Month,
                    Total = total
                });
            }

            return result;
        }

        private List<SpendingByCategoryDTO> GetSpendingByCategory(IQueryable<Expense> monthExpenses)
        {
            return monthExpenses
                .GroupBy(e => e.Category)
                .Select(e => new SpendingByCategoryDTO
                {
                    Name = e.Key!.Name,
                    Spend = e.Sum(e => e.Amount)

                }).ToList();
        }
    }
}
