using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Models
{
    public class Site : BaseModel
    {
        public string Name { get; set; } = null!;
        public string Slug { get; set; } = null!;
        public bool IsPublic { get; set; } // Anyone can view published version
        public bool IsPublished { get; set; }

        // FK
        public Guid? ScreenshotId { get; set; } = null;
        public string OwnerId { get; set; } = null!;
        public Guid OrganizationId { get; set; }

        // relo
        public Media? Screenshot { get; set; } = null;
        public AppUser Owner { get; set; } = null!;
        public Organization Organization { get; set; } = null!;
        public List<SiteMember> Members { get; set; } = new List<SiteMember>();
        public ICollection<Page> Pages { get; set; } = new List<Page>();
    }

}