using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.Category
{
    public record SpendingByCategoryDTO
    {
        public string Name { get; set; } = string.Empty;
        public decimal Spend {  get; set; }

    }
}
