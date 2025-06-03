using BL.InterfaceServices;
using BL.Services;
using DL.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChallengeController : ControllerBase
    {
        private readonly IChallengeService _challengeService;

        public ChallengeController(IChallengeService challengeService)
        {
            _challengeService = challengeService;
        }

        [HttpGet("last")]
        public async Task<IActionResult> GetLastChallenge()
        {
            var challenge = await _challengeService.GetLastChallengeAsync();
            if (challenge == null)
                return NotFound("No challenges found.");

            return Ok(challenge);
        }

        [HttpGet("past")]
        public async Task<IActionResult> GetPastChallenges()
        {
            var challenges = await _challengeService.GetPastChallengesAsync();
            return Ok(challenges);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddChallenge([FromBody] Challenge challenge)
        {
            if (challenge == null)
                return BadRequest("Invalid challenge data.");

            var addedChallenge = await _challengeService.AddChallengeAsync(challenge);
            return CreatedAtAction(nameof(GetLastChallenge), new { id = addedChallenge.Id }, addedChallenge);
        }
    }
}
