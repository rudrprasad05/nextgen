using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Models.Request
{
    public class CreateSiteRequestDto
    {
        public string Name { get; set; } = null!;
        public string Slug { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Template { get; set; } = "blank";

        public string DefaultSeoTitle { get; set; } = null!;
        public string DefaultSeoDescription { get; set; } = null!;

        // base64 data URL
        public string? Favicon { get; set; }

        public SiteStatus Status { get; set; } = SiteStatus.Draft;
    }

}