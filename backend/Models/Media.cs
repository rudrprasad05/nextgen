using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models;

public class Media : BaseModel
{
    public string Url { get; set; } = string.Empty;
    public string ObjectKey { get; set; } = string.Empty;
    public string AltText { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public long SizeInBytes { get; set; }
    public bool ShowInGallery { get; set; } = true;

    public string UploadedByUserId { get; set; } = null!;
    public AppUser UploadedByUser { get; set; } = null!;

    public Organization Organization { get; set; } = null!;
    public Guid OrganizationId { get; set; }
}

