using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.Expense
{
    public class FilterExpenseDTO
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 8;
        public string? Description { get; set; }
        public int? CategoryId {  get; set; }
        public int? PaymentMethodId { get; set; }
        public DateTime? FromTheDate { get; set; }
        public DateTime? ToTheDate { get; set; }

    }
}
