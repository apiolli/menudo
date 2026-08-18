using Azure.Core;
using Menudo.Domain.Entities;
using Menudo.Domain.Interfaces;
using Menudo.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(MenudoDbContext context) : base(context)
        {
        }

        public async Task<User?> GetByIdAsync(Guid id) => await _dbSet.FirstOrDefaultAsync(x => x.Id.Equals(id));
        public async Task<bool> EmailExistAsync(string email) => await _dbSet.AnyAsync(u => u.Email == email);
        public async Task<User?> UserExistsAsync(string email) => await _dbSet.FirstOrDefaultAsync(u => u.Email == email);

    }
}
