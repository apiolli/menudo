using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.User
{
    public record ChangePasswordDTO
    {
        public string CurrentPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}
