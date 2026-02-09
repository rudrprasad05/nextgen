using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class MetaDataModel
    {
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public string? Slug { get; set; }

        public DateTime? CreatedOn { get; set; }

        public DateTime? UpdatedOn { get; set; }
    }
}