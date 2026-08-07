using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Exceptions
{
    public class ConflictException : AppException
    {
        public override int StatusCode => 409;
        public ConflictException(string message) : base(message) { }
    }
}
