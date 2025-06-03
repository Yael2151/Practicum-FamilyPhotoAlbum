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
        public async Task<IActionResult> AddVote(int userId, int imageId)
        {
            bool success = await _voteService.AddVoteAsync(userId, imageId);
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

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserVote(int userId)
        {
            var vote = await _voteService.GetUserVoteAsync(userId);
            if (vote == null)
            {
                return NotFound();
            }
            return Ok(vote);
        }
    }
}
