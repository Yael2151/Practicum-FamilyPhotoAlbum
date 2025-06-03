using BL.InterfaceServices;
using DL;
using DL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Mysqlx;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class ImageService : IImageService
    {

        private readonly IDataContext _dataContext;
        public ImageService(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Image>> GetImagesByChallengeIdAsync(int id)
        {
            return await _dataContext.Images.Where(u => u.ChallengeId == id).ToListAsync();
            //return await _dataContext.Images.ToListAsync();
        }

        public async Task AddImageAsync(Image image)
        {
            await _dataContext.Images.AddAsync(image);
            await _dataContext.SaveChangesAsync();
        }
    }
}