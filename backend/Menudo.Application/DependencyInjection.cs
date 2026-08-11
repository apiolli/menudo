using FluentValidation;
using Menudo.Application.Interfaces;
using Menudo.Application.Services;
using Menudo.Application.Validators.Category;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Menudo.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(cfg => { }, typeof(DependencyInjection));
            services.AddValidatorsFromAssemblyContaining<CreateCategoryDTOValidator>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IPaymentMethodService, PaymentMethodService>();
            services.AddScoped<IExpenseService, ExpenseService>();
            return services;

        }

    }
}
