using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models.Request;
using Backend.Models;

namespace Backend.Interfaces
{
    public interface ISiteService
    {
        Task<Site> CreateSiteAsync(CreateSiteRequestDto dto, string ownerId);
    }

}