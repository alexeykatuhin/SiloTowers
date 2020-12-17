using System;
using System.Collections.Generic;
using System.Text;

namespace SiloTowers.Data.Entities
{
    public class Tower
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Indicator> Indicators { get; set; }
    }
}
