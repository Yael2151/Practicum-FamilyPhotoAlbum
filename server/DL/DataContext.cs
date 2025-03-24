using DL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class DataContext : DbContext, IDataContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }
        //public DbSet<Challenge> Challenges { get; set; }
        public DbSet<Vote> Votes { get; set; }

        public async Task<int> SaveChangesAsync()
        {
             return await base.SaveChangesAsync();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(@"Server=bk5vyrcyeltukzmuwnx5-mysql.services.clever-cloud.com;Port=3306;Database=bk5vyrcyeltukzmuwnx5;User=umggyijly5wxkuyx;Password=tmjUyHdJiVEhBw2VSAQz",
                new MySqlServerVersion(new Version(8, 0, 0)));
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Challenge>()
        //        .HasMany(c => c.Images)
        //        .WithOne(i => i.Challenge)
        //        .HasForeignKey(i => i.ChallengeId)
        //        .OnDelete(DeleteBehavior.SetNull);

        //}

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Challenge>()
        //        .HasOne(c => c.WinningImg)
        //        .WithMany()  // אין צורך בקשר הפוך
        //        .HasForeignKey(c => c.WinningImgId)
        //        .OnDelete(DeleteBehavior.SetNull); // אם התמונה נמחקת, ה-ID יישאר ריק

        //    modelBuilder.Entity<Challenge>()
        //        .HasOne(c => c.OwnerOfTheWinningImg)
        //        .WithMany()
        //        .HasForeignKey(c => c.OwnerOfTheWinningImgId)
        //        .OnDelete(DeleteBehavior.Cascade);
        //}
    }
}
