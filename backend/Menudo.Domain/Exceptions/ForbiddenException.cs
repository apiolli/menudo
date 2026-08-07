using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Exceptions
{
    public class ForbiddenException : AppException
    {
        public override int StatusCode => 403;
        public ForbiddenException(string message) : base(message) { }
    }
}
