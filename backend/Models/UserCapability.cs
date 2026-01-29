using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Models
{
    public enum CapabilityScopeType
    {
        Global,
        Site,
        Page
    }

    public class UserCapability : BaseModel
    {
        public Guid UserId { get; set; }
        public string CapabilityKey { get; set; } = null!;
        public CapabilityScopeType ScopeType { get; set; } = CapabilityScopeType.Global;
        public Guid? ScopeId { get; set; }

        public AppUser User { get; set; } = null!;
    }

}