using Menudo.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.PaymentMethod
{
    public record CreatePaymentMethodDTO
    {
        public string Name { get; set; } = string.Empty;
        public string PaymentType { get; set; } = string.Empty;
        public string? Detail { get; set; }
        public string Icon { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
    }
}
