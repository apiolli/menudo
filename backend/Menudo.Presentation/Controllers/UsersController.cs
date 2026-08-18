using Menudo.Application.DTOs.User;
using Menudo.Application.Interfaces;
using Menudo.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Menudo.Presentation.Controllers
{
    [ApiController]
    [Route("api/users")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetProfile()
        {
            var profile = await _userService.GetCurrentProfileAsync();
            return Ok(profile);
        }

        [HttpPut("me")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserDTO request)
        {
            var profile = await _userService.UpdateProfileAsync(request);
            return Ok(profile);
        }

        [HttpPut("me/password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO request)
        {
            await _userService.ChangePasswordAsync(request);
            return NoContent();
        }

        [HttpDelete("me")]
        public async Task<IActionResult> DeleteProfile()
        {
            await _userService.DeleteProfileAsync();
            return NoContent();
        }
    }
}
