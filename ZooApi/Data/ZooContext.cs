using Microsoft.EntityFrameworkCore;
using ZooApi.Models;

namespace ZooApi.Data
{
    public class ZooContext : DbContext
    {
        public ZooContext(DbContextOptions<ZooContext> options) : base(options) { }

        public DbSet<Animal> Animais { get; set; }
        public DbSet<Cuidado> Cuidados { get; set; }
        public DbSet<AnimalCuidado> AnimaisCuidados { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AnimalCuidado>()
                .HasKey(ac => new { ac.AnimalId, ac.CuidadoId });

            modelBuilder.Entity<AnimalCuidado>()
                .HasOne(ac => ac.Animal)
                .WithMany(a => a.AnimaisCuidados)
                .HasForeignKey(ac => ac.AnimalId);

            modelBuilder.Entity<AnimalCuidado>()
                .HasOne(ac => ac.Cuidado)
                .WithMany(c => c.AnimaisCuidados)
                .HasForeignKey(ac => ac.CuidadoId);
        }
    }
}