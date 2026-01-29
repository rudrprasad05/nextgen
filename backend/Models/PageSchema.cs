using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class PageSchema
    {
        public List<ElementNode> Elements { get; set; } = new();
    }
}