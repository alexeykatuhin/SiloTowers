using System;
using System.Collections.Generic;
using System.Text;

namespace SiloTowers.Core.Models
{
    public class IndicatorDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Value { get; set; }
        public int MinValue { get; set; }
        public int MaxValue { get; set; }
    }
}
