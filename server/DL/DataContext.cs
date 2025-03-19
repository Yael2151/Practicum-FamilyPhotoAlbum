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
        public DbSet<File1> Files { get; set; }
        public DbSet<Folder> Folders { get; set; }

        public int SaveChanges()
        {
            return base.SaveChanges();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(@"Server=bk5vyrcyeltukzmuwnx5-mysql.services.clever-cloud.com;Port=3306;Database=bk5vyrcyeltukzmuwnx5;User=umggyijly5wxkuyx;Password=tmjUyHdJiVEhBw2VSAQz",
                new MySqlServerVersion(new Version(8, 0, 0)));
        }
    }
}
