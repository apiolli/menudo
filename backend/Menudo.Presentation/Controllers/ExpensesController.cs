using Menudo.Application.DTOs.Expense;
using Menudo.Application.DTOs.PaymentMethod;
using Menudo.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Menudo.Presentation.Controllers
{
    [Route("api/expenses")]
    [ApiController]
    [Authorize]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseService service;
        public ExpensesController(IExpenseService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDTO>>> GetAll()
        {
            var response = await service.GetAllExpensesAsync();
            return Ok(response);
        }


        [HttpGet("{id}", Name = "GetExpense")]
        public async Task<ActionResult<ExpenseDTO>> GetById(int id)
        {
            var response = await service.GetExpenseById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<ExpenseDTO>> Post(CreateExpenseDTO dto)
        {
            var response = await service.CreateExpenseAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, UpdateExpenseDTO dto)
        {
            await service.UpdateExpenseAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await service.DeleteExpenseAsync(id);
            return NoContent();
        }

        [HttpGet("filter")]
        public async Task<ActionResult<PaginationExpenseDTO>> FilterExpenses([FromQuery]FilterExpenseDTO dto)
        {
            var response = await service.FilterExpensesAsync(dto);
            return Ok(response);
        }

        [HttpGet("export")]
        public async Task<IActionResult> ExportExpenses([FromQuery] ExportFormat format, [FromQuery] FilterExpenseDTO? filter)
        {
            var result = await service.ExportExpensesAsync(format, filter);
            return File(result.Content, result.ContentType, result.FileName);
        }
    }
}
