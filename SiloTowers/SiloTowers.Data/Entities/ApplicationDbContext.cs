using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace SiloTowers.Data.Entities
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IndicatorType>().HasData(new IndicatorType { Id = 1, Name = "Масса" }, new IndicatorType { Id = 2, Name = "Уровень" });
            var towers = new List<Tower>();
            var indicators = new List<Indicator>();
            Random rnd = new Random();
            int indicatorId = 1;
            for (int i = 1; i < 9; i++)
            {
                towers.Add(new Tower { Id = i, Name = $"Башня №{i}" });
                indicators.Add(new Indicator { Id = indicatorId++, Title = $"Уровень карналита в силосной башне №{i}", MaxValue =100, MinValue = 0, TowerId = i, IndicatorTypeId = 1, Value = rnd.Next(0, 100) });
                indicators.Add(new Indicator { Id = indicatorId++, Title = $"Масса карналита", MaxValue = 100, MinValue = 0, TowerId = i, IndicatorTypeId = 2, Value = rnd.Next(0, 100) });

            }
            modelBuilder.Entity<Tower>().HasData(towers);
            modelBuilder.Entity<Indicator>().HasData(indicators);

        }
        public DbSet<IndicatorType> IndicatorTypes { get; set; }
        public DbSet<Indicator> Indicators { get; set; }
        public DbSet<Tower> Towers { get; set; }
    }
}
