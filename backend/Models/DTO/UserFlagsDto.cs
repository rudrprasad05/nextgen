using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models.DTO
{
    public class UserFlagsDto
    {
        public bool CanManageUsers { get; set; }
        public bool CanDeploySites { get; set; }
    }

}