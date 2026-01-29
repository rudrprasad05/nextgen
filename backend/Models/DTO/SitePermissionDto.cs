using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models.DTO
{
    public class SitePermissionDto
    {
        public Guid SiteId { get; set; }
        public List<string> Permissions { get; set; } = new(); // View, Edit, Publish
    }

}