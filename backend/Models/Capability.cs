using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Capability
    {
        public string Key { get; set; } = null!; // e.g. "page.edit"
        public string Description { get; set; } = null!;
    }

}