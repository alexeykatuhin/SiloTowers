using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SiloTowers.Data.Entities
{
    public class Indicator
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Value { get; set; }
        public int MaxValue { get; set; }
        public int MinValue { get; set; }

        public int IndicatorTypeId { get; set; }
        public IndicatorType IndicatorType { get; set; }
        public int TowerId { get; set; }
        public Tower Tower { get; set; }
    }
}
