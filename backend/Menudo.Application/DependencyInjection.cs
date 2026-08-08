using AutoMapper;
using FluentValidation;
using Menudo.Application.Mapping;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;

namespace Menudo.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfiles>(),
                   NullLoggerFactory.Instance);

            services.AddFluentValidationAutoValidation();
            return services;

        }

    }
}
