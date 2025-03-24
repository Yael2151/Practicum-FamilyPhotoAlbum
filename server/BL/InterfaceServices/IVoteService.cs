using DL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.InterfaceServices
{

    public interface IVoteService
    {
        Task<bool> AddVoteAsync(int userId);
        Task<int> GetVoteCountAsync(int imageId);
    }
    //interface IVoteService
    //{
    //    Task<Vote> GetVoteAsync(int userId, int imageId);
    //    Task<bool> AddVoteAsync(Vote voteDto);
    //    Task<int> GetVotesCountAsync(int imageId);
    //}
}
