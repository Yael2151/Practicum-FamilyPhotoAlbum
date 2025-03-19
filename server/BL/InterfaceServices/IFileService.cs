
using DL.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.InterfaceServices
{
    public interface IFileService
    {
        public List<File1> GetAllFiles();
        public File1 GetFileById(int id);
        public void AddFile(File1 user);
        public void UpdateFile(int id, File1 user);
        public void RemoveFile(int id);
    }
}
