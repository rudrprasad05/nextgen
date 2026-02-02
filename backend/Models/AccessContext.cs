using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Models
{
    public class AccessContext : BaseModel
    {
        public string UserId { get; set; } = null!;

        public List<string>? AllowedIps { get; set; }
        public List<string>? DeniedIps { get; set; }

        public DateTime? ValidFrom { get; set; }
        public DateTime? ValidUntil { get; set; }

        public AppUser User { get; set; } = null!;
    }

}