using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class PageSchema
    {
        public ElementNode Root { get; set; } = new();
        public MetaDataModel MetaData { get; set; } = new();
    }
}