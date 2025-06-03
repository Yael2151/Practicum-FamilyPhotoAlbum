using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    public enum ERole { User, Admin}
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; } = DateTime.Now;
        public string CreatedBy { get; set; } = "system";
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; } = "system";
        public ERole Role { get; set; }
        public bool IsDeleted { get; set; }


        public User() { }

        public User(string name, string email, string password, string createdBy)
        {
            Name = name;
            Email = email;
            Password = password;
            CreatedBy = createdBy;
        }
    }
}
