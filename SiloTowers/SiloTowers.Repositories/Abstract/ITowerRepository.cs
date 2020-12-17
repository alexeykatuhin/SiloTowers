using SiloTowers.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SiloTowers.Repositories.Abstract
{
    public interface ITowerRepository
    {
        Task<List<TowerDto>> GetTowers();
        Task<TowerDto> EditIndicator(IndicatorDto indicatorDto);
    }
}
