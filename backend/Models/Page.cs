using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Models
{
    public enum PageStatus
    {
        Draft,
        Published
    }

    public class Page : BaseModel
    {
        public Guid SiteId { get; set; }
        public string Slug { get; set; } = null!;
        public string Title { get; set; } = null!;
        public PageStatus Status { get; set; } = PageStatus.Draft;

        // Stored as JSON
        public PageSchema Schema { get; set; } = null!;

        public Site Site { get; set; } = null!;
    }

}