using Menudo.Application.DTOs.Expense;
using Menudo.Domain.Entities;
using Menudo.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.Category
{
    public record CategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Budget { get; set; }
        public decimal Spent { get; set; }
        public Status Status { get; set; }
        public string Color { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public int TotalExpenses { get; set; }
        public List<ExpenseSummaryDTO> Expenses { get; set; } = [];

    }
}
