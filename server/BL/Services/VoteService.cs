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
    public class VoteService : IVoteService
    {
        private readonly DataContext _context;

        public VoteService(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> AddVoteAsync(int userId)
        {
            bool alreadyVoted = await _context.Votes
                .AnyAsync(v => v.UserId == userId);

            if (alreadyVoted)
                return false;

            var vote = new Vote
            {
                UserId = userId,
                //ImageId = imageId
            };

            _context.Votes.Add(vote);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<int> GetVoteCountAsync(int imageId)
        {
            return await _context.Votes.CountAsync(v => v.ImageId == imageId);
        }
    }
}
