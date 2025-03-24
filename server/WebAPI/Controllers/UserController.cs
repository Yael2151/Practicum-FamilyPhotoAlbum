using BL.InterfaceServices;
using BL.Services;
using DL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet]
        public async Task<List<User>> GetAllUsers()
        {
            return await userService.GetAllUsersAsync();
        }


        [HttpGet("{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<User> GetUserById(int id)
        {
            return await userService.GetUserByIdAsync(id);
        }

        [HttpPost]
        public async Task AddUser([FromBody] User user)
        {
            await userService.AddUserAsync(user);
        }

        [HttpPut("{id}")]
        //[Authorize]
        public async Task UpDateUser(int id, [FromBody] User user)
        {
            await userService.UpdateUserAsync(id, user);
        }

        [HttpDelete("{id}")]
        //[Authorize(Policy = "AdminOnly")]
        public async Task RemoveUser(int id)
        {
            await userService.RemoveUserAsync(id);
        }

        //[HttpPost("login")]
        //public async Task<IActionResult> LoginUser([FromBody] DL.Entities.Login login)
        //{
        //    try
        //    {
        //        await userService.LoginAsync(login.Email, login.Password);
        //        return Ok(new {message = "Login successful" });
        //        //return Ok("Login successful");
        //    }
        //    catch (UnauthorizedAccessException)
        //    {
        //        return Unauthorized("Invalid email or password");
        //    }
        //}

        [HttpPost("login")]
        public async Task<IActionResult> LoginUserAsync([FromBody] DL.Entities.Login login)
        {
            try
            {
                var user = await userService.LoginAsync(login.Email, login.Password);

                //await userService.LoginAsync(login.Email, login.Password);

                return Ok(new { user, message = "Login successful" }); // מחזיר אובייקט JSON
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }
        }




    }
}
