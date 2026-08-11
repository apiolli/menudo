using Menudo.Application.DTOs.PaymentMethod;
using Menudo.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.Interfaces
{
    public interface IPaymentMethodService
    {
        Task<PaymentMethodDTO> CreatePaymentMethodAsync(CreatePaymentMethodDTO dto);
        Task<IEnumerable<PaymentMethodDTO>> GetAllPaymentMethodsAsync();
        Task<PaymentMethodDTO> GetPaymentMethodById(int id);
        Task UpdatePaymentMethodAsync(int id, UpdatePaymentMethodDTO dto);
        Task DeletePaymentMethodAsync(int id);

    }
}
