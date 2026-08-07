using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Exceptions
{
    public class UnauthorizedException : AppException
    {
        public override int StatusCode => 401;
        public UnauthorizedException(string message) : base(message) { }
    }
}
