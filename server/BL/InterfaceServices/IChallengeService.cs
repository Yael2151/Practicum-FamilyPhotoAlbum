using DL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.InterfaceServices
{
    public interface IChallengeService
    {
        Task<Challenge?> GetLastChallengeAsync();
        Task<List<Challenge>> GetPastChallengesAsync();
        Task<Challenge> AddChallengeAsync(Challenge challenge);
    }
}
