using DL.Entities;
using Mysqlx.Notice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    public class Challenge
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? WinningImgId { get; set; }
        public Image? WinningImg { get; set; }
        public int? OwnerOfTheWinningImgId { get; set; }
        public User? OwnerOfTheWinningImg { get; set; }
        public List<Image> Images { get; set; } = new List<Image>();
    }
}