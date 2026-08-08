using Menudo.Application.DTOs.Category;
using Menudo.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Menudo.Presentation.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService service;
        public CategoriesController(ICategoryService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetAll()
        {
            var response = await service.GetAllCategoriesAsync();
            return Ok(response);
        }

        [HttpGet("{id}", Name ="GetCategory")]
        public async Task<ActionResult<CategoryDTO>> GetById(int id)
        {
            var response = await service.GetCategoryById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDTO>> Post(CreateCategoryDTO dto)
        {
            var response = await service.CreateCategoryAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, UpdateCategoryDTO dto)
        {
            await service.UpdateCategoryAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await service.DeleteCategoryAsync(id);
            return NoContent();
        }
    }
}
