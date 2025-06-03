using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    public class Vote
    {
        public int Id { get; set; }
        public int UserId { get; set; }  // אפשר לשמור מזהה רנדומלי לכל מצביע
        public int ImageId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public Image Image { get; set; }
        public User User { get; set; }

    }
}
