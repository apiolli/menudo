using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.Expense
{
    public record TotalSpentPerMonthDTO
    {
        public string Month { get; set; } = string.Empty;
        public int Year { get; set; }
        public int MonthNumber { get; set; }
        public decimal Total { get; set; }
    }
}
