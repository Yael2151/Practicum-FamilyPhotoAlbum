using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    class Permission
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; } = DateTime.Now;
        public string CreatedBy { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }


        public Permission() { }

        public Permission(int id, string name, string description, string createdBy)
        {
            Id = id;
            Name = name;
            Description = description;
            CreatedBy = createdBy;
        }
    }
}
