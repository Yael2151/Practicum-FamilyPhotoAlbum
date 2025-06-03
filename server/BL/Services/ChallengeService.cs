using BL.InterfaceServices;
using DL;
using DL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class ChallengeService : IChallengeService
    {
        private readonly IDataContext _dataContext;

        public ChallengeService(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Challenge?> GetLastChallengeAsync()
        {
            return await _dataContext.Challenges
                .OrderByDescending(c => c.StartDate)
                .FirstOrDefaultAsync();
        }

        //public async Task<List<Challenge>> GetPastChallengesAsync()
        //{
        //    return await _dataContext.Challenges
        //        .Where(c => c.EndDate < DateTime.UtcNow)
        //        .OrderByDescending(c => c.EndDate)
        //        .ToListAsync();
        //}

        public async Task<List<Challenge>> GetPastChallengesAsync()
        {
            return await _dataContext.Challenges
                .Where(c => c.EndDate < DateTime.UtcNow)
                .Include(c => c.WinningImg) // כאן הוספנו טעינת התמונה המנצחת
                .OrderByDescending(c => c.EndDate)
                .ToListAsync();
        }


        public async Task<Challenge> AddChallengeAsync(Challenge challenge)
        {
            await _dataContext.Challenges.AddAsync(challenge);
            await _dataContext.SaveChangesAsync();
            return challenge;
        }
    }
}
