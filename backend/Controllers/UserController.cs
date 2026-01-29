using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces;
using backend.Models.DTO;
using backend.Models.Request;
using Backend.Controllers;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : BaseController
    {
        private readonly IUserService _service;

        public UsersController(
            IUserService service,
            IConfiguration configuration,
            ILogger<UsersController> logger,
            ITokenService tokenService
        ) : base(configuration, tokenService, logger)
        {

            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserListItemDto>>> GetUsers(CancellationToken ct)
        {
            var users = await _service.GetUsersAsync(ct);
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequestDto dto, CancellationToken ct)
        {
            await _service.CreateUserAsync(dto, ct);
            return Ok();
        }
    }

}