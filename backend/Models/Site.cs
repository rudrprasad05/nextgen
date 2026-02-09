using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Models
{
    public enum SiteStatus
    {
        Draft,
        Active,
        Archived
    }

    public class Site : BaseModel
    {
        public string Name { get; set; } = null!;
        public string Slug { get; set; } = null!;
        public string OwnerId { get; set; } = null!;
        public SiteStatus Status { get; set; } = SiteStatus.Draft;
        public Media? Screenshot { get; set; } = null;
        public Guid? ScreenshotId { get; set; } = null;
        public AppUser Owner { get; set; } = null!;
        public ICollection<Page> Pages { get; set; } = new List<Page>();
    }

}