using Menudo.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.PaymentMethod
{
    public record UpdatePaymentMethodDTO
    {
        public string Name { get; set; } = string.Empty;
        public PaymentType Type { get; set; }
        public string? Detail { get; set; }
        public string Icon { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
    }
}
