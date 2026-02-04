using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.DTO
{
    public class PageDto : BaseDTO
    {
        public string Slug { get; set; } = null!;
        public string Title { get; set; } = null!;
        public PageStatus Status { get; set; } = PageStatus.Draft;

        // Stored as JSON
        public PageSchema Schema { get; set; } = null!;

        public Guid SiteId { get; set; }
        public OnlySiteDto Site { get; set; } = null!;
    }
}