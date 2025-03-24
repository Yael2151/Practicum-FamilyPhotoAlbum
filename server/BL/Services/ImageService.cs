using BL.InterfaceServices;
using DL;
using DL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class ImageService : IImageService
    {
        //private readonly IConfiguration _configuration;
        private readonly IDataContext _dataContext;

        public ImageService(IDataContext dataContext)
        {
            _dataContext = dataContext;
            //_configuration = configuration;
        }

        //public List<Image> GetImagesByChallengeId(int id)
        //{
        //    return _dataContext.Images.Where(u => u.Id == id).ToList();
        //}
        //public void AddImage(Image image)
        //{
        //    {
        //        _dataContext.Images.Add(image);
        //        _dataContext.SaveChanges();
        //    }
        //}

        public async Task<List<Image>> GetImagesByChallengeIdAsync()
        {
            //return await _dataContext.Images.Where(u => u.ChallengeId == id).ToListAsync();
            return await _dataContext.Images.ToListAsync();
        }

        public async Task AddImageAsync(Image image)
        {
            await _dataContext.Images.AddAsync(image);
            await _dataContext.SaveChangesAsync();
        }
    }
}
