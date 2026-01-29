using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models;

public class AppUser : IdentityUser
{
    public Media? ProfilePicture { get; set; } = null;
    public int? ProfilePictureId { get; set; } = null;
    [Required] public DateTime CreatedOn { get; set; } = DateTime.Now;
    [Required] public DateTime UpdatedOn { get; set; } = DateTime.Now;
    [Required] public bool IsDeleted { get; set; } = false;

    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    public ICollection<Media> Media { get; set; } = new List<Media>();

    public ICollection<UserCapability> Capabilities { get; set; } = new List<UserCapability>();
    public ICollection<AccessContext> AccessContexts { get; set; } = new List<AccessContext>();

    public ICollection<SiteUser> Sites { get; set; } = new List<SiteUser>();
    public ICollection<Site> OwnedSites { get; set; } = new List<Site>();
}
