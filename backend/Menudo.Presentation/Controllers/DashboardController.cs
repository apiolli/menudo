using Menudo.Application.DTOs.Dashboard;
using Menudo.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Menudo.Presentation.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService service;

        public DashboardController(IDashboardService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<DashboardDTO>> GetDashboard(Guid userId)
        {
            var response = service.GetDashboardData();
            return Ok(response);
        }

    }
}
