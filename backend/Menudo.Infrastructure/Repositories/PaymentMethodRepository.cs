using Menudo.Domain.Entities;
using Menudo.Domain.Interfaces;
using Menudo.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Infrastructure.Repositories
{
    public class PaymentMethodRepository : BaseRepository<PaymentMethod>, IPaymentMethodRepository
    {
        public PaymentMethodRepository(MenudoDbContext context) : base(context)
        {
        }
    }
}
