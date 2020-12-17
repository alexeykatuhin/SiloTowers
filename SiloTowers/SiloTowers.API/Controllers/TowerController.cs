using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SiloTowers.Core.Models;
using SiloTowers.Data.Entities;
using SiloTowers.Repositories.Abstract;

namespace SiloTowers.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TowerController : ControllerBase
    {
        private readonly ITowerRepository towerRepository;

        public TowerController(ITowerRepository towerRepository)
            => this.towerRepository = towerRepository;
        [HttpGet]
        public async Task<ActionResult<List<TowerDto>>> GetTowers()
            => Ok(await towerRepository.GetTowers());

        [HttpPut]
        public async Task<ActionResult<TowerDto>> EditIndicator([FromBody] IndicatorDto indicatorDto)
            => Ok(await this.towerRepository.EditIndicator(indicatorDto));
    }
}