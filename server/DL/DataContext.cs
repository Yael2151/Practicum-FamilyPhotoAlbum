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
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Challenge> Challenges { get; set; }
        public DbSet<Vote> Votes { get; set; }

        public async Task<int> SaveChangesAsync()
        {
            return await base.SaveChangesAsync();
        }




        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseMySql(@"Server=bk5vyrcyeltukzmuwnx5-mysql.services.clever-cloud.com;Port=3306;Database=bk5vyrcyeltukzmuwnx5;User=umggyijly5wxkuyx;Password=tmjUyHdJiVEhBw2VSAQz",
        //        new MySqlServerVersion(new Version(8, 0, 0)));
        //}


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


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User - Image (1:N)
            modelBuilder.Entity<Image>()
                .HasOne(i => i.User)
                .WithMany()
                .HasForeignKey(i => i.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // User - Vote (1:N)
            modelBuilder.Entity<Vote>()
                .HasOne(v => v.User)
                .WithMany()
                .HasForeignKey(v => v.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Image - Vote (1:N)
            modelBuilder.Entity<Vote>()
                .HasOne(v => v.Image)
                .WithMany(i => i.Votes)
                .HasForeignKey(v => v.ImageId)
                .OnDelete(DeleteBehavior.Cascade);

            // Challenge - Image (1:N)
            modelBuilder.Entity<Image>()
                .HasOne(i => i.Challenge)
                .WithMany(c => c.Images)
                .HasForeignKey(i => i.ChallengeId)
                .OnDelete(DeleteBehavior.Cascade);

            // Challenge - Winning Image (optional)
            modelBuilder.Entity<Challenge>()
                .HasOne<Image>() // אין לנו ניווט הפוך מהתמונה לאתגר הזוכה
                .WithMany()
                .HasForeignKey(c => c.WinningImgId)
                .OnDelete(DeleteBehavior.SetNull);

            // Challenge - OwnerOfTheWinningImgId (optional)
            modelBuilder.Entity<Challenge>()
                .HasOne<User>() // אין ניווט הפוך
                .WithMany()
                .HasForeignKey(c => c.OwnerOfTheWinningImgId)
                .OnDelete(DeleteBehavior.SetNull);
        }

    }
}
