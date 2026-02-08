using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.DTO
{
    public class CreatePageRequestDto
    {
        public string SiteSlug { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string? Slug { get; set; }
        public string? Content { get; set; }
        public string? MetaDescription { get; set; }
        public string? MetaKeywords { get; set; }
        public bool? IsPublished { get; set; }
    }
}