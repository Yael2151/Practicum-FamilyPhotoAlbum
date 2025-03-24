using BL.InterfaceServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoteController : ControllerBase
    {
        private readonly IVoteService _voteService;

        public VoteController(IVoteService voteService)
        {
            _voteService = voteService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddVote(int userId)
        {
            bool success = await _voteService.AddVoteAsync(userId);
            if (!success)
                return BadRequest("User has already voted for this image.");

            return Ok("Vote added successfully.");
        }

        [HttpGet("count/{imageId}")]
        public async Task<IActionResult> GetVoteCount(int imageId)
        {
            int count = await _voteService.GetVoteCountAsync(imageId);
            return Ok(count);
        }
    }
}
