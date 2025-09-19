using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class AlquilerDbContext: DbContext
    {
        public AlquilerDbContext(DbContextOptions db):base(db)
        { 
        }
        public DbSet<Clientes> Clientes { get; set; }
        public DbSet<Backend.Models.Vehiculos> Vehiculos { get; set; }
        public DbSet<Backend.Models.Alquileres> Alquileres { get; set; }
    }

}
