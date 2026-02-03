using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.DTO
{
    public class UserListItemDto
    {
        public string Id { get; set; } = default!;
        public string Username { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Role { get; set; } = default!;
        public bool IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
    }

}