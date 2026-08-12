using Menudo.Domain.Entities;
using Menudo.Domain.Interfaces;
using Menudo.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
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

        public new async Task<List<PaymentMethod>> GetAllAsync() => await _dbSet.Include(x => x.Expenses).ToListAsync();
    }
}
