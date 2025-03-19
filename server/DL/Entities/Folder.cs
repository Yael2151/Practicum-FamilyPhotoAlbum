using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL.Entities
{
    public class Folder
    {
        public int Id { get; set; }
        public int Name { get; set; }
        public int ParentFolderId { get; set; }
        public string OwnerId { get; set; }
        public DateTime CreatedAt { get; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; }
        public bool IsDeleted { get; set; }


        public Folder() { }

        public Folder(int id, int name, int parentFolderId, string ownerId, bool isDeleted)
        {
            Id = id;
            Name = name;
            ParentFolderId = parentFolderId;
            OwnerId = ownerId;
            IsDeleted = isDeleted;
        }
    }
}
