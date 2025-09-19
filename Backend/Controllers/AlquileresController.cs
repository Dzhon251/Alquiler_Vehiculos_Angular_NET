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
            return await _context.Alquileres.ToListAsync();
        }

        // GET: api/Alquileres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Alquileres>> GetAlquileres(int id)
        {
            var alquileres = await _context.Alquileres.FindAsync(id);

            if (alquileres == null)
            {
                return NotFound();
            }

            return alquileres;
        }

        // PUT: api/Alquileres/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAlquileres(int id, Alquileres alquileres)
        {
            if (id != alquileres.Id)
            {
                return BadRequest();
            }

            _context.Entry(alquileres).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlquileresExists(id))
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
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Alquileres>> PostAlquileres(Alquileres alquileres)
        {
            _context.Alquileres.Add(alquileres);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAlquileres", new { id = alquileres.Id }, alquileres);
        }

        // DELETE: api/Alquileres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAlquileres(int id)
        {
            var alquileres = await _context.Alquileres.FindAsync(id);
            if (alquileres == null)
            {
                return NotFound();
            }

            _context.Alquileres.Remove(alquileres);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AlquileresExists(int id)
        {
            return _context.Alquileres.Any(e => e.Id == id);
        }
    }
}
