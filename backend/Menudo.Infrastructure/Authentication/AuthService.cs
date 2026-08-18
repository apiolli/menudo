using Menudo.Application.DTOs.Auth;
using Menudo.Application.Interfaces;
using Menudo.Domain.Entities;
using Menudo.Domain.Exceptions;
using Menudo.Domain.Interfaces;
using Menudo.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Menudo.Infrastructure.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _repo;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public AuthService(
            IUserRepository repo,
            IPasswordHasher<User> passwordHasher,
            IJwtTokenGenerator jwtTokenGenerator)
        {
            _repo = repo;
            _passwordHasher = passwordHasher;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<AuthDTO> LoginAsync(LoginDTO request)
        {
            var user = await _repo.UserExistsAsync(request.Email);
            if (user == null) throw new ConflictException("Credenciales invalidas");
            

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);

            if (result == Microsoft.AspNetCore.Identity.PasswordVerificationResult.Failed) throw new BadRequestException("Credenciales invalidas");

            var token = _jwtTokenGenerator.GenerateToken(user);

            return new AuthDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Token = token
            };
        }

        public async Task<AuthDTO> RegisterAsync(RegisterDTO request)
        {
            var emailExists = await _repo.EmailExistAsync(request.Email);

            if (emailExists)
            {
                throw new ConflictException("Email already in use");
            }


            var user = new User
            {
                Email = request.Email,
                Name = request.Name
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

            _repo.AddAsync(user);
            await _repo.SaveChangesAsync();

            var token = _jwtTokenGenerator.GenerateToken(user);

            return new AuthDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Token = token
            };
        }
    }
}
