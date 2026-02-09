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
        public Site Site { get; set; } = null!;
        public Guid SiteId { get; set; }
        public MetaDataModel MetaData { get; set; } = new();
        public string Slug { get; set; } = string.Empty;
        public PageStatus Status { get; set; } = PageStatus.Draft;

        public Guid CurrentSchemaVersionId { get; set; }

        public PageSchemaVersion CurrentSchemaVersion { get; set; } = null!;

        public List<PageSchemaVersion> SchemaVersions { get; set; } = new();
    }

}