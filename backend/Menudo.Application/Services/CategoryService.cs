using AutoMapper;
using FluentValidation;
using Menudo.Application.DTOs.Category;
using Menudo.Application.Interfaces;
using Menudo.Domain.Entities;
using Menudo.Domain.Enums;
using Menudo.Domain.Exceptions;
using Menudo.Domain.Interfaces;

namespace Menudo.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repo;
        private readonly IValidator<CreateCategoryDTO> _createDtoValidator;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository repo, IMapper mapper, IValidator<CreateCategoryDTO> createDtoValidator)
        {
            _repo = repo;
            _mapper = mapper;
            _createDtoValidator = createDtoValidator;
        }

        public async Task<CategoryDTO> CreateCategoryAsync(CreateCategoryDTO dto)
        {
            var result = _createDtoValidator.Validate(dto);

            if (!result.IsValid) throw new ValidationException(result.Errors);

            var category = _mapper.Map<Category>(dto);

            // Se cambia el estado a activo
            category.Status = Status.Active;
            category.Spent = 0;

            await _repo.AddAsync(category);
            await _repo.SaveChangesAsync();

            return _mapper.Map<CategoryDTO>(category);
        }

        public async Task<IEnumerable<CategoryDTO>> GetAllCategoriesAsync()
        {
            var categories = await _repo.GetAllAsync();

            if (!categories.Any()) throw new NotFoundException("Actualmente no existen categorias.");

            return _mapper.Map<IEnumerable<CategoryDTO>>(categories);
        }

        public async Task<CategoryDTO> GetCategoryById(int id)
        {
            var categoria = await _repo.GetByIdAsync(id) 
                ?? throw new NotFoundException($"La categoria con id {id} no existe"); ;

            return _mapper.Map<CategoryDTO>(categoria);
        }

        public async Task UpdateCategoryAsync(int id, UpdateCategoryDTO dto)
        {
            var categoria = await _repo.GetByIdAsync(id) 
                ?? throw new NotFoundException($"La categoria con id {id} no existe");

            _mapper.Map(dto, categoria);
            _repo.Update(categoria);
            await _repo.SaveChangesAsync();
        }

        public async Task DeleteCategoryAsync(int id)
        {
            var categoria = await _repo.GetByIdAsync(id) 
                ?? throw new NotFoundException($"La categoria con id {id} no existe");

            _repo.Delete(categoria);
            await _repo.SaveChangesAsync();
        }
    }
}
