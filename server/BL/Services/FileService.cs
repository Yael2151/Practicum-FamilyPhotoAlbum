using DL.Entities;
using DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class FileService
    {
        private readonly IDataContext _dataContext;

        public FileService(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public List<File1> GetAllFiles()
        {
            return _dataContext.Files.ToList();
        }
        public File1 GetFileById(int id)
        {
            //BabyValidation.ValidateBabyId(id);
            return _dataContext.Files.Where(f => f.Id == id).FirstOrDefault();
        }
        public void AddFile(File1 file)
        {
            //BabyValidation.ValidateBabyId(baby.Id);
            //BabyValidation.ValidateBabyName(baby.Name);
            {
                _dataContext.Files.Add(file);
                _dataContext.SaveChanges();
            }

        }
        public void UpdateFile(int id, File1 file)
        {
            //BabyValidation.ValidateBabyId(baby.Id);
            //BabyValidation.ValidateBabyId(id);
            //BabyValidation.ValidateBabyName(baby.Name);
            var newFile = _dataContext.Files.Where(file => file.Id == id).FirstOrDefault();
            if (newFile != null)
            {
                newFile.Id = file.Id;
                newFile.Name = file.Name;
                newFile.Type = file.Type;
                newFile.Size = file.Size;
                newFile.S3Key = file.S3Key;
                newFile.FolderId = file.FolderId;
                newFile.OwnerId = file.OwnerId;
                newFile.UpdatedAt = DateTime.Now;
                newFile.IsDeleted = file.IsDeleted;
                _dataContext.SaveChanges();
            }
        }
        public void RemoveFile(int id)
        {
            var fileToDelete = _dataContext.Files.FirstOrDefault(file => file.Id == id);
            if (fileToDelete != null)
            {
                _dataContext.Files.Remove(fileToDelete);
                _dataContext.SaveChanges();
            }

        }

    }
}
