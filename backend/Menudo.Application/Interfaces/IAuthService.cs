using Menudo.Application.DTOs.Auth;

namespace Menudo.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthDTO> LoginAsync(LoginDTO request);
        Task<AuthDTO> RegisterAsync(RegisterDTO request);
    }
}
