using BL.InterfaceServices;
using BL.Services;
using DL.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            this._imageService = imageService;
        }

        //[HttpGet("{id}")]
        [HttpGet]
        public async Task<ActionResult<List<Image>>> GetImagesByChallengeId()
        {
            var images = await _imageService.GetImagesByChallengeIdAsync();
            return Ok(images);
        }

        [HttpPost]
        public async Task<IActionResult> AddImage([FromBody] Image image)
        {
            await _imageService.AddImageAsync(image);
            return Ok();
        }
    }
}
