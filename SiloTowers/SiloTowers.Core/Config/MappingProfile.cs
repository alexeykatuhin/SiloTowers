using AutoMapper;
using SiloTowers.Core.Models;
using SiloTowers.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SiloTowers.Core.Config
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Tower, TowerDto>()
                .ForMember(x=>x.IndicatorLevel, y=>y.MapFrom(z=>z.Indicators.FirstOrDefault(i=>i.IndicatorTypeId == 1)))
                .ForMember(x => x.IndicatorMass, y => y.MapFrom(z => z.Indicators.FirstOrDefault(i => i.IndicatorTypeId == 2)));

            CreateMap<Indicator, IndicatorDto>();
        } 
    }
}
