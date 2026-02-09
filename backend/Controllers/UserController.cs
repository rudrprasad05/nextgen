using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Interfaces;
using Backend.Models.DTO;
using Backend.Models.Request;
using Backend.Controllers;
using Backend.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : BaseController
    {
        private readonly IUserRepository _service;

        public UsersController(
            IUserRepository service,
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
            var users = await _service.GetAllAsync(ct);
            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserRequestDto dto, CancellationToken ct)
        {
            await _service.CreateAsync(dto, ct);
            return Ok();
        }

        [HttpGet("get-user-by-uuid")]
        public async Task<IActionResult> GetUserByUUID([FromQuery] RequestQueryObject queryObject)
        {
            var model = await _service.GetByIdAsync(queryObject.UUID.ToString() ?? "");
            return StatusCode(model.StatusCode, model);
        }
    }

}