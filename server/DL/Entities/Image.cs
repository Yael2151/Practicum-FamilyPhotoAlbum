using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    public class Image
    {
        public int Id { get; set; }
        public int UserId { get; set; } 
        public int ChallengeId { get; set; }
        public string ImageUrl { get; set; }
        public string Caption { get; set; }
        public DateTime CreatedAt { get; } = DateTime.Now;
        public User? User { get; set; }
        public Challenge? Challenge { get; set; }
        public List<Vote> Votes { get; set; } = new List<Vote>();
    }
}
