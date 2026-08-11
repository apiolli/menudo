using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.Expense
{
    public class CreateExpenseDTO
    {
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public int PaymentMethodId { get; set; }
    }
}
