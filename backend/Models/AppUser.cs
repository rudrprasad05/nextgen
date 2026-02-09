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
    // basic stuff
    [Required] public DateTime CreatedOn { get; set; } = DateTime.Now;
    [Required] public DateTime UpdatedOn { get; set; } = DateTime.Now;
    [Required] public bool IsDeleted { get; set; } = false;

    // additional profile info
    public Media? ProfilePicture { get; set; } = null;
    public Guid? ProfilePictureId { get; set; } = null;
    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    public ICollection<Media> Media { get; set; } = new List<Media>();

    // admin flag
    public bool IsPlatformAdmin { get; set; } = false;

}
