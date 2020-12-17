using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SiloTowers.Core.Models;
using SiloTowers.Data.Entities;
using SiloTowers.Repositories.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SiloTowers.Repositories.Concrete
{
    public class TowerRepository : ITowerRepository
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public TowerRepository(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        public async Task<List<TowerDto>> GetTowers()
        {
            var towersDb = await this.context.Towers.Include(x => x.Indicators).ToListAsync();
            var result = towersDb.Select(x => this.mapper.Map<TowerDto>(x)).ToList();
            return result;
        }

        public async Task<TowerDto> EditIndicator(IndicatorDto indicatorDto)
        {
            var indicatorDb = await this.context.Indicators.SingleAsync(x => x.Id == indicatorDto.Id);
            indicatorDb.MaxValue = indicatorDto.MaxValue;
            indicatorDb.MinValue = indicatorDto.MinValue;
            indicatorDb.Title = indicatorDto.Title;
            indicatorDb.Value = indicatorDb.Value;
            this.context.SaveChanges();

            return await GetTower(indicatorDb.TowerId);
        }

        private async Task<TowerDto> GetTower(int towerId)
            => this.mapper.Map<TowerDto>(await this.context.Towers.Include(x => x.Indicators).SingleAsync(x => x.Id == towerId));

    }
}
