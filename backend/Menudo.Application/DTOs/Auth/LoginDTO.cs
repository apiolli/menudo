using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.Auth
{
    public record LoginDTO
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
