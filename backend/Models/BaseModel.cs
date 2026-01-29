using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models;

public class BaseModel
{
    [Key] public Guid Id { get; set; }
    [Required] public DateTime CreatedOn { get; set; } = DateTime.Now;
    [Required] public DateTime UpdatedOn { get; set; } = DateTime.Now;
    [Required] public bool IsDeleted { get; set; } = false;
}
