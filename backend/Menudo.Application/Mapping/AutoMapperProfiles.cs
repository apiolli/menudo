using AutoMapper;
using Menudo.Application.DTOs.Category;
using Menudo.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

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
                .ForMember(ent => ent.Expenses, config => config.Ignore());

            CreateMap<Category, CategoryDTO>();

            CreateMap<UpdateCategoryDTO, Category>()
                .ForMember(ent => ent.Id, config => config.Ignore())
                .ForMember(ent => ent.Expenses, config => config.Ignore());

            // Mapeos de metodos de pago

            // Mapeos de gastos
        }
    }
}
