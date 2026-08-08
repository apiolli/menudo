using AutoMapper;
using FluentValidation;
using Menudo.Application.Interfaces;
using Menudo.Application.Mapping;
using Menudo.Application.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;

namespace Menudo.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(cfg => { }, typeof(DependencyInjection));
            services.AddScoped<ICategoryService, CategoryService>();
            return services;

        }

    }
}
