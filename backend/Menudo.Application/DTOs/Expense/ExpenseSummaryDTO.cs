using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.Expense
{
    public record ExpenseSummaryDTO
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
