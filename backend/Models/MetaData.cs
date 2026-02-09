using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class MetaDataModel
    {
        // ===== SEO =====
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        /// <summary>
        /// URL-friendly slug (e.g. "about-us")
        /// </summary>

        public string? Keywords { get; set; }

        public bool NoIndex { get; set; } = false;

        public bool NoFollow { get; set; } = false;

        // ===== Open Graph =====
        public string? OgTitle { get; set; }
        public string? OgDescription { get; set; }
        public string? OgImage { get; set; }

        // ===== System =====
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedOn { get; set; } = DateTime.UtcNow;
    }

}