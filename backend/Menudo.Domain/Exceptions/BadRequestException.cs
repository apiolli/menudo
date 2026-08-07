using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Exceptions
{
    public class BadRequestException : AppException
    {
        public override int StatusCode => 400;
        public BadRequestException(string message) : base(message) { }
    }
}
