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
    public class VoteService : IVoteService
    {
        private readonly IDataContext _dataContext;

        public VoteService(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        //public async Task<bool> AddVoteAsync(int userId)
        //{
        //    bool alreadyVoted = await _dataContext.Votes
        //        .AnyAsync(v => v.UserId == userId);

        //    if (alreadyVoted)
        //        return false;

        //    var vote = new Vote
        //    {
        //        UserId = userId,
        //        //ImageId = imageId
        //    };

        //    _dataContext.Votes.Add(vote);
        //    await _dataContext.SaveChangesAsync();

        //    return true;
        //}


        // זה עבד לפני עכשיו אני מנסה לשים פונקציה שתוסיף את ההצבעה גם למערך התמונות
        //public async Task<bool> AddVoteAsync(int userId, int imageId)
        //{
        //    var imageExists = await _dataContext.Images.AnyAsync(i => i.Id == imageId);
        //    if (!imageExists)
        //    {
        //        throw new Exception("התמונה לא קיימת במערכת");
        //    }

        //    var existingVote = await _dataContext.Votes.FirstOrDefaultAsync(v => v.UserId == userId);
        //    if (existingVote != null)
        //    {
        //        existingVote.ImageId = imageId; // מעדכן את ההצבעה במקום להוסיף חדשה
        //    }
        //    else
        //    {
        //        var newVote = new Vote { UserId = userId, ImageId = imageId };
        //        await _dataContext.Votes.AddAsync(newVote);
        //    }

        //    await _dataContext.SaveChangesAsync();
        //    return true;
        //}

        public async Task<bool> AddVoteAsync(int userId, int imageId)
        {
            // טוען את התמונה יחד עם ההצבעות שלה
            var image = await _dataContext.Images
                .Include(i => i.Votes)
                .FirstOrDefaultAsync(i => i.Id == imageId);

            if (image == null)
            {
                throw new Exception("התמונה לא קיימת במערכת");
            }

            // בודק אם המשתמש כבר הצביע לתמונה כלשהי
            var existingVote = await _dataContext.Votes
                .Include(v => v.Image) // מביא גם את התמונה הקודמת
                .FirstOrDefaultAsync(v => v.UserId == userId);

            if (existingVote != null)
            {
                // אם המשתמש הצביע לתמונה אחרת, מסירים את ההצבעה הישנה מהרשימה של התמונה הישנה
                if (existingVote.ImageId != imageId)
                {
                    existingVote.Image.Votes.Remove(existingVote);
                    existingVote.ImageId = imageId;
                    image.Votes.Add(existingVote); // מוסיפים לרשימה של התמונה החדשה
                }
            }
            else
            {
                // יצירת הצבעה חדשה
                var newVote = new Vote { UserId = userId, ImageId = imageId };
                image.Votes.Add(newVote);
                await _dataContext.Votes.AddAsync(newVote);
            }

            await _dataContext.SaveChangesAsync();
            return true;
        }


        public async Task<int> GetVoteCountAsync(int imageId)
        {
            return await _dataContext.Votes.CountAsync(v => v.ImageId == imageId);
        }

        public async Task<Vote?> GetUserVoteAsync(int userId)
        {
            return await _dataContext.Votes.FirstOrDefaultAsync(v => v.UserId == userId);
        }
    }
}


//using BL.InterfaceServices;
//using DL.Entities;
//using DL;
//using Microsoft.EntityFrameworkCore;

//public class VoteService : IVoteService
//{
//    private readonly IDbContextFactory<DataContext> _contextFactory;

//    public VoteService(IDbContextFactory<DataContext> contextFactory)
//    {
//        _contextFactory = contextFactory;
//    }

//    public async Task<bool> AddVoteAsync(int userId, int imageId)
//    {
//        using var context = _contextFactory.CreateDbContext();

//        var imageExists = await context.Images.AnyAsync(i => i.Id == imageId);
//        if (!imageExists)
//        {
//            throw new Exception("התמונה לא קיימת במערכת");
//        }

//        var existingVote = await context.Votes.FirstOrDefaultAsync(v => v.UserId == userId);
//        if (existingVote != null)
//        {
//            existingVote.ImageId = imageId; // מעדכן את ההצבעה במקום להוסיף חדשה
//        }
//        else
//        {
//            var newVote = new Vote { UserId = userId, ImageId = imageId };
//            await context.Votes.AddAsync(newVote);
//        }

//        await context.SaveChangesAsync();
//        return true;
//    }

//    public async Task<int> GetVoteCountAsync(int imageId)
//    {
//        using var context = _contextFactory.CreateDbContext();
//        return await context.Votes.CountAsync(v => v.ImageId == imageId);
//    }

//    public async Task<Vote?> GetUserVoteAsync(int userId)
//    {
//        using var context = _contextFactory.CreateDbContext();
//        return await context.Votes.AsNoTracking().FirstOrDefaultAsync(v => v.UserId == userId);
//    }
//}
