using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlquileresController : ControllerBase
    {
        private readonly AlquilerDbContext _context;

        public AlquileresController(AlquilerDbContext context)
        {
            _context = context;
        }

        // GET: api/Alquileres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Alquileres>>> GetAlquileres()
        {
            return await _context.Alquileres
                .Include(a => a.ClientesModel)
                .Include(a => a.VehiculoModel)
                .ToListAsync();
        }

        // GET: api/Alquileres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Alquileres>> GetAlquiler(int id)
        {
            var alquiler = await _context.Alquileres
                .Include(a => a.ClientesModel)
                .Include(a => a.VehiculoModel)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (alquiler == null)
            {
                return NotFound();
            }

            return alquiler;
        }

        // PUT: api/Alquileres/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlquiler(int id, Alquileres alquiler)
        {
            if (id != alquiler.Id)
            {
                return BadRequest();
            }

            _context.Entry(alquiler).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlquilerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Alquileres
        [HttpPost]
        public async Task<ActionResult<Alquileres>> PostAlquiler(Alquileres alquiler)
        {
            _context.Alquileres.Add(alquiler);
            await _context.SaveChangesAsync();

            var createdAlquiler = await _context.Alquileres
                .Include(a => a.ClientesModel)
                .Include(a => a.VehiculoModel)
                .FirstOrDefaultAsync(a => a.Id == alquiler.Id);

            return CreatedAtAction("GetAlquiler", new { id = alquiler.Id }, createdAlquiler);
        }

        // DELETE: api/Alquileres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlquiler(int id)
        {
            var alquiler = await _context.Alquileres.FindAsync(id);
            if (alquiler == null)
            {
                return NotFound();
            }

            _context.Alquileres.Remove(alquiler);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlquilerExists(int id)
        {
            return _context.Alquileres.Any(e => e.Id == id);
        }
    }
}
