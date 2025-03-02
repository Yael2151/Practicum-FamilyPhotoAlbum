using BL.InterfaceServices;
using DL.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController
    {
        private readonly IUserService userService;
        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpGet("{id}")]
        public User GetBUserById(int id)
        {
            return userService.GetUserById(id);
        }
        [HttpGet]
        public List<User> Get()
        {
            return userService.GetAllUsers();
        }
        [HttpPost]
        public void AddUser([FromBody] User user)
        {
            userService.AddUser(user);
        }
        [HttpPut("{id}")]
        public void UpDateUser(int id, [FromBody] User user)
        {
            userService.UpdateUser(id, user);
        }
        [HttpDelete("{id}")]
        public void RemoveUser(int id)
        {
            userService.RemoveUser(id);
        }

    }
}
