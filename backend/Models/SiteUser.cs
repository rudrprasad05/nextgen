using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Models
{
    public class SiteUser : BaseModel
    {
        public Guid SiteId { get; set; }
        public Guid UserId { get; set; }

        public Site Site { get; set; } = null!;
        public AppUser User { get; set; } = null!;
    }

}