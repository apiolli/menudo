using AutoMapper;
using Menudo.Application.DTOs.Category;
using Menudo.Application.DTOs.Expense;
using Menudo.Application.DTOs.PaymentMethod;
using Menudo.Domain.Entities;

namespace Menudo.Application.Mapping
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Mapeos de categorias
            CreateMap<CreateCategoryDTO, Category>()
                .ForMember(ent => ent.Id, config => config.Ignore())
                .ForMember(ent => ent.Status, config => config.Ignore())
                .ForMember(ent => ent.Expenses, config => config.Ignore())
                .ForMember(ent => ent.Spent, config => config.Ignore());

            CreateMap<Category, CategoryDTO>();

            CreateMap<UpdateCategoryDTO, Category>()
                .ForMember(ent => ent.Id, config => config.Ignore())
                .ForMember(ent => ent.Expenses, config => config.Ignore())
                .ForMember(ent => ent.Spent, config => config.Ignore());

            // Mapeos de metodos de pago
            CreateMap<CreatePaymentMethodDTO, PaymentMethod>()
                .ForMember(ent => ent.Id, config => config.Ignore())
                .ForMember(ent => ent.Expenses, config => config.Ignore())
                .ForMember(ent => ent.Type, config => config.MapFrom(dto => dto.PaymentType));

            CreateMap<PaymentMethod, PaymentMethodDTO>();

            CreateMap<UpdatePaymentMethodDTO, PaymentMethod>()
                .ForMember(ent => ent.Id, config => config.Ignore())
                .ForMember(ent => ent.Expenses, config => config.Ignore());

            // Mapeos de gastos
            CreateMap<CreateExpenseDTO, Expense>()
                .ForMember(ent => ent.Id, config => config.Ignore())
                .ForMember(ent => ent.Category, config => config.Ignore())
                .ForMember(ent => ent.PaymentMethod, config => config.Ignore());

            CreateMap<Expense, ExpenseDTO>();

            CreateMap<UpdateExpenseDTO, Expense>()
                .ForMember(ent => ent.Id, config => config.Ignore())
                .ForMember(ent => ent.Category, config => config.Ignore())
                .ForMember(ent => ent.PaymentMethod, config => config.Ignore());
        }
    }
}
