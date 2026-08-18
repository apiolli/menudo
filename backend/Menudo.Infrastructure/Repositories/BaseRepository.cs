using Menudo.Domain.Interfaces;
using Menudo.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Infrastructure.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private readonly MenudoDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public BaseRepository(MenudoDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);
        public void Delete(T entity) => _dbSet.Remove(entity);
        public async Task<List<T>> GetAllAsync() => await _dbSet.ToListAsync();
        public async Task<T?> GetByIdAsync(int id) => await _dbSet.FindAsync(id);
        public IQueryable<T> GetQueryable() => _dbSet.AsQueryable();
        public void Update(T entity) => _dbSet.Update(entity);
        public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
    }
}
