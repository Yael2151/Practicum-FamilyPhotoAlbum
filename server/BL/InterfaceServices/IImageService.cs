using DL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.InterfaceServices
{
    public interface IImageService
    {
        //public List<Image> GetImagesByChallengeId(int id);
        //public void AddImage(Image image);
        Task<List<Image>> GetImagesByChallengeIdAsync();
        Task AddImageAsync(Image image);
    }
}
