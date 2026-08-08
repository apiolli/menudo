using AutoMapper;
using Menudo.Application.Interfaces;
using Menudo.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repo;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task
    }
}
