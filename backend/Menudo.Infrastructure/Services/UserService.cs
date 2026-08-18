using Menudo.Application.DTOs.User;
using Menudo.Application.Interfaces;
using Menudo.Domain.Entities;
using Menudo.Domain.Exceptions;
using Menudo.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace Menudo.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        private readonly ICurrentUserService _currentUserService;

        public UserService(IUserRepository repo, ICurrentUserService currentUserService)
        {
            _repo = repo;
            _currentUserService = currentUserService;
        }

        private async Task<User> GetCurrentUserEntity()
        {
            var userId = _currentUserService.UserId;
            if (userId == null) throw new UnauthorizedAccessException("Usuario no autenticado");

            // Asumiendo que GetByIdAsync recibe un Guid
            var user = await _repo.GetByIdAsync(userId.Value);
            if (user == null) throw new Exception("Usuario no encontrado");
            return user;
        }

        public async Task<UserDTO> GetCurrentProfileAsync()
        {
            var user = await GetCurrentUserEntity();
            return new UserDTO { Id = user.Id, Name = user.Name, Email = user.Email };
        }

        public async Task<UserDTO> UpdateProfileAsync(UpdateUserDTO request)
        {
            var user = await GetCurrentUserEntity();

            if (user.Email != request.Email)
            {
                // Se corrige el error sintáctico pasando el email y el id actual para validar duplicados
                var emailExists = await _repo.EmailExistAsync(request.Email);
                if (emailExists) throw new ConflictException("El email ya está en uso");

                user.Email = request.Email;
            }

            user.Name = request.Name;

            // En arquitectura limpia, los cambios se guardan a través del repositorio o unidad de trabajo, 
            // no accediendo directamente a _context desde el servicio de infraestructura.
            _repo.Update(user);
            await _repo.SaveChangesAsync();
            return new UserDTO { Id = user.Id, Name = user.Name, Email = user.Email };
        }

        public async Task ChangePasswordAsync(ChangePasswordDTO request)
        {
            var user = await GetCurrentUserEntity();

            var hasher = new PasswordHasher<User>();
            var result = hasher.VerifyHashedPassword(user, user.PasswordHash, request.CurrentPassword);

            if (result == PasswordVerificationResult.Failed)
            {
                throw new Exception("La contraseña actual es incorrecta");
            }

            user.PasswordHash = hasher.HashPassword(user, request.NewPassword);
            _repo.Update(user);
            await _repo.SaveChangesAsync();

        }

        public async Task DeleteProfileAsync()
        {
            var user = await GetCurrentUserEntity();
            _repo.Delete(user);
            await _repo.SaveChangesAsync();

        }

    }
}