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
        Task<bool> AddVoteAsync(int userId, int imageId);
        Task<int> GetVoteCountAsync(int imageId);
        Task<Vote?> GetUserVoteAsync(int userId);
    }
    //interface IVoteService
    //{
    //    Task<Vote> GetVoteAsync(int userId, int imageId);
    //    Task<bool> AddVoteAsync(Vote voteDto);
    //    Task<int> GetVotesCountAsync(int imageId);
    //}
}
