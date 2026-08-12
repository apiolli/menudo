using Menudo.Application.DTOs.Category;
using Menudo.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Menudo.Application.Interfaces
{
    public interface ICategoryService
    {
        Task<CategoryDTO> CreateCategoryAsync(CreateCategoryDTO dto);
        Task<IEnumerable<CategoryDTO>> GetAllCategoriesAsync();
        Task<CategoryDTO> GetCategoryById(int id);
        Task UpdateCategoryAsync(int id, UpdateCategoryDTO dto);
        Task DeleteCategoryAsync(int id);
        Task<Category> ValidateCategoryByIdAsync(int id);

    }
}
