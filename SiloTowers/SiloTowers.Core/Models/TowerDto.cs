using System;
using System.Collections.Generic;
using System.Text;

namespace SiloTowers.Core.Models
{
    public class TowerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IndicatorDto IndicatorLevel { get; set; }
        public IndicatorDto IndicatorMass { get; set; }
    }
}
