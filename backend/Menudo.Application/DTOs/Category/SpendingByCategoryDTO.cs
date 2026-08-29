using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.Category
{
    public record SpendingByCategoryDTO
    {
        public string Name { get; set; } = string.Empty;
        public string Color {get; set;} = string.Empty;
        public decimal Value {  get; set; }

    }
}
