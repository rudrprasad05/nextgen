using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models.DTO
{
    public class SiteAccessDto
    {
        public bool AllSites { get; set; }
        public List<SitePermissionDto> Sites { get; set; } = new();
    }

}