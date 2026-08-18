using Menudo.Application.DTOs.User;
using Menudo.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Interfaces
{
    public interface IUserService
    {
        Task<UserDTO> GetCurrentProfileAsync();
        Task<UserDTO> UpdateProfileAsync(UpdateUserDTO request);
        Task ChangePasswordAsync(ChangePasswordDTO request);
        Task DeleteProfileAsync();
    }
}
