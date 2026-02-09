using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models.DTO;

namespace Backend.Models.Request
{
    public class CreateUserRequestDto
    {
        public string Username { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;

        public string Role { get; set; } = default!; // ADMIN / USER / CUSTOM

        public SiteAccessDto SiteAccess { get; set; } = new();
        public List<string> PagePermissions { get; set; } = new();
        public List<string> IpWhitelist { get; set; } = new();

        public UserFlagsDto Flags { get; set; } = new();
    }

}