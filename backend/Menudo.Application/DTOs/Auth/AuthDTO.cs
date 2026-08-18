using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.DTOs.Auth
{
    public record AuthDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
    }
}
