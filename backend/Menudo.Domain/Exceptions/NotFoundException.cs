using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Exceptions
{
    public class NotFoundException : AppException
    {
        public override int StatusCode => 404;
        public NotFoundException(string message) : base(message) { }
    }
}
