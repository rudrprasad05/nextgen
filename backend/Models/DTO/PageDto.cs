using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.DTO
{
    public class PageDto : BaseDTO
    {
        public OnlySiteDto Site { get; set; } = null!;
        public Guid SiteId { get; set; }
        public MetaDataModel MetaData { get; set; } = new();
        public string Slug { get; set; } = string.Empty;
        public PageStatus Status { get; set; } = PageStatus.Draft;

        public Guid CurrentSchemaVersionId { get; set; }

        public PageSchemaVersionDto CurrentSchemaVersion { get; set; } = null!;

        public List<PageSchemaVersionDto> SchemaVersions { get; set; } = new();

    }
}