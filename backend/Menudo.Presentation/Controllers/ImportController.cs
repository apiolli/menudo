using Menudo.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Menudo.Presentation.Controllers
{
    [ApiController]
    [Route("api/import")]
    [Authorize]
    public class ImportController : ControllerBase
    {
        private readonly IImportService _importService;

        public ImportController(IImportService importService)
        {
            _importService = importService;
        }

        [HttpGet("template")]
        public IActionResult GetTemplate()
        {
            var fileBytes = _importService.GetTemplate();
            string fileName = "gastos_template.xlsx";
            string contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

            return File(fileBytes, contentType, fileName);
        }

        [HttpPost]
        public async Task<IActionResult> ImportExpenses(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "El archivo está vacío o no fue enviado." });
            }

            using var stream = file.OpenReadStream();
            var result = await _importService.ImportAsync(stream);

            return Ok(new
            {
                successCount = result.SuccessCount,
                failureCount = result.FailureCount,
                errors = result.Errors
            });
        }
    }
}