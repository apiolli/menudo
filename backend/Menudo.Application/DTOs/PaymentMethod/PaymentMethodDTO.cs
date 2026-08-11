using Menudo.Application.DTOs.Expense;
using Menudo.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.PaymentMethod
{
    public record PaymentMethodDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty; 
        public PaymentType Type { get; set; }
        public string? Detail { get; set; }
        public List<ExpenseInCategoryDTO> Expenses { get; set; } = [];
        public string Icon { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
    }
}
