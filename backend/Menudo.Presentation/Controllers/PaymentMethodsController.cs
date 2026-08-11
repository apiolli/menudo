using Menudo.Application.DTOs.Category;
using Menudo.Application.DTOs.PaymentMethod;
using Menudo.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Menudo.Presentation.Controllers
{
    [Route("api/paymentMethods")]
    [ApiController]
    public class PaymentMethodsController : ControllerBase
    {
        private readonly IPaymentMethodService service;
        public PaymentMethodsController(IPaymentMethodService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentMethodDTO>>> GetAll()
        {
            var response = await service.GetAllPaymentMethodsAsync();
            return Ok(response);
        }

        [HttpGet("{id}", Name = "GetPaymentMethod")]
        public async Task<ActionResult<PaymentMethodDTO>> GetById(int id)
        {
            var response = await service.GetPaymentMethodById(id);
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<PaymentMethodDTO>> Post(CreatePaymentMethodDTO dto)
        {
            var response = await service.CreatePaymentMethodAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, UpdatePaymentMethodDTO dto)
        {
            await service.UpdatePaymentMethodAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await service.DeletePaymentMethodAsync(id);
            return NoContent();
        }
    }
}
