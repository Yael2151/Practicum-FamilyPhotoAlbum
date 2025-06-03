using Amazon.S3;
using Amazon.S3.Model;
using BL.InterfaceServices;
using DL.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/upload")]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly IImageService _imageService;

        public UploadController(IAmazonS3 s3Client, IImageService imageService)
        {
            _s3Client = s3Client;
            _imageService = imageService;
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName, [FromQuery] int userId, [FromQuery] string caption, [FromQuery] int challengeId)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "my-buckets-testpnoren",
                Key = fileName,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(5),
                //ContentType = "image/jpeg" // או סוג הקובץ המתאים
                //ContentType = "image/jpeg/JPG/pdf/docx/png"
            };

            string url = _s3Client.GetPreSignedURL(request);

            var image = new Image
            {
                UserId = userId,
                ChallengeId = challengeId,
                ImageUrl = $"https://my-buckets-testpnoren.s3.us-east-1.amazonaws.com/{fileName}",
                Caption = caption
            };

            await _imageService.AddImageAsync(image);

            return Ok(new { url });
        }
    }
}