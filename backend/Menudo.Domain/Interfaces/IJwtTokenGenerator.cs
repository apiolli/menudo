using Menudo.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Interfaces
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
    }
}
