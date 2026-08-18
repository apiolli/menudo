using Menudo.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Interfaces
{
    public interface IPaymentMethodRepository : IBaseRepository<PaymentMethod>
    {
        Task<List<PaymentMethod>?> GetAllAsync(Guid id);
    }
}
