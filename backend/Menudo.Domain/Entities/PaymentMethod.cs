using Menudo.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Entities
{
    public class PaymentMethod
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public PaymentType Type { get; set; }
        public string? Detail {  get; set; }
        public string Icon { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
    }
}
