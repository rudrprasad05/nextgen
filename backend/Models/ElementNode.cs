using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Backend.Models
{
    public enum ElementType
    {
        H1,
        H2,
        H3,
        P,
        Image,
        Section,
        Body
    }

    public class ElementNode
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ElementType Type { get; set; }
        public Dictionary<string, object> Props { get; set; } = new();
        public ElementStyles Styles { get; set; } = new();
        public List<ElementNode>? Children { get; set; }
    }

    public class ElementStyles
    {
        public string? Padding { get; set; }
        public string? Margin { get; set; }
        public string? Color { get; set; }
        public string? Background { get; set; }
        public string? CustomCss { get; set; }

        // Text
        public string? FontWeight { get; set; }
        public string? FontStyle { get; set; }
        public string? TextDecoration { get; set; }
        public string? FontSize { get; set; }
        public string? TextAlign { get; set; }
        public string? LineHeight { get; set; }
        public string? MaxWidth { get; set; }
        public string? MinWidth { get; set; }
        public string? MinHeight { get; set; }
        public string? MaxHeight { get; set; }

        // Image
        public string? Width { get; set; }
        public string? Height { get; set; }
        public string? ObjectFit { get; set; }
        public string? BorderRadius { get; set; }

        // Flex / Section
        public string? FlexDirection { get; set; }
        public string? JustifyContent { get; set; }
        public string? AlignItems { get; set; }
        public string? Gap { get; set; }
    }


}