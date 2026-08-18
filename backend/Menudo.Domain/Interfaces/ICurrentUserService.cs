using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Domain.Interfaces
{
    public interface ICurrentUserService
    {
        public Guid? UserId { get; }
    }
}
