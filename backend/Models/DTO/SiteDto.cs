using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Models.DTO
{
    public class OnlySiteDto : BaseDTO
    {
        public string Name { get; set; } = null!;
        public string Slug { get; set; } = null!;
        public string OwnerId { get; set; } = null!;
        public SiteStatus Status { get; set; } = SiteStatus.Draft;
        public MediaDto? Screenshot { get; set; } = null;
        public Guid? ScreenshotId { get; set; } = null;
        public long? NumberOfPages { get; set; } = 0;
    }

    public class SiteDto : BaseDTO
    {
        public string Name { get; set; } = null!;
        public string Slug { get; set; } = null!;
        public string OwnerId { get; set; } = null!;
        public SiteStatus Status { get; set; } = SiteStatus.Draft;
        public MediaDto? Screenshot { get; set; } = null;
        public Guid? ScreenshotId { get; set; } = null;
        public ICollection<PageDto> Pages { get; set; } = new List<PageDto>();
        public long? NumberOfPages { get; set; } = 0;
    }
}