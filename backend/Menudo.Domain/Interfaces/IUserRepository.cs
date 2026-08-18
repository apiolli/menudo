using Menudo.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User?> GetByIdAsync(Guid id);
        Task<bool> EmailExistAsync(string email);
        Task<User?> UserExistsAsync(string email);
    }
}
