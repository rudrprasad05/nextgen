using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.DTO
{
    public class PageSchemaVersionDto
    {
        public Guid PageId { get; set; }
        public PageDto? Page { get; set; } = null;

        public int Version { get; set; }

        public PageSchema PageSchema { get; set; } = null!;

        public bool IsPublished { get; set; }

        public string? CreatedByUserId { get; set; }
        public AppUser? CreatedByUser { get; set; }
    }
}