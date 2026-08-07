using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Exceptions
{
    public abstract class AppException : Exception
    {
        public abstract int StatusCode { get; }
        protected AppException(string message) : base(message) { }
    }
}
