using Menudo.Application.Interfaces;
using Menudo.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Security.Claims;

namespace Menudo.Infrastructure.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid? UserId
        {
            get
            {
                var userIdString = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out Guid parsedGuid))
                {
                    return null;
                }

                return parsedGuid;
            }
        }
    }
}