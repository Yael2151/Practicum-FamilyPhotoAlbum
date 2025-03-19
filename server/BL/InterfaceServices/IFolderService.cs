using DL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.InterfaceServices
{
    interface IFolderService
    {
        public List<Folder> GetAllFolders();
        public Folder GetFolderById(int id);
        public void AddFolder(Folder user);
        public void UpdateFolder(int id, Folder user);
        public void RemoveFolder(int id);
    }
}
