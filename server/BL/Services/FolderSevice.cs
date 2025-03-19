using DL.Entities;
using DL;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    class FolderSevice
    {
        private readonly IDataContext _dataContext;

        public FolderSevice(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public List<Folder> GetAllFolders()
        {
            return _dataContext.Folders.ToList();
        }
        public Folder GetFolderById(int id)
        {
            //BabyValidation.ValidateBabyId(id);
            return _dataContext.Folders.Where(f => f.Id == id).FirstOrDefault();
        }
        public void AddFolder(Folder folder)
        {
            //BabyValidation.ValidateBabyId(baby.Id);
            //BabyValidation.ValidateBabyName(baby.Name);
            {
                _dataContext.Folders.Add(folder);
                _dataContext.SaveChanges();
            }

        }
        public void UpdateFolder(int id, Folder folder)
        {
            //BabyValidation.ValidateBabyId(baby.Id);
            //BabyValidation.ValidateBabyId(id);
            //BabyValidation.ValidateBabyName(baby.Name);
            var newFolder = _dataContext.Folders.Where(folder => folder.Id == id).FirstOrDefault();
            if (newFolder != null)
            {
                newFolder.Id = folder.Id;
                newFolder.Name = folder.Name;
                newFolder.ParentFolderId = folder.ParentFolderId;
                newFolder.OwnerId = folder.OwnerId;
                newFolder.UpdatedAt = DateTime.Now;
                newFolder.IsDeleted = folder.IsDeleted;
                _dataContext.SaveChanges();
            }
        }
        public void RemoveFolder(int id)
        {
            var folderToDelete = _dataContext.Folders.FirstOrDefault(folder => folder.Id == id);
            if (folderToDelete != null)
            {
                _dataContext.Folders.Remove(folderToDelete);
                _dataContext.SaveChanges();
            }

        }
    }
}
