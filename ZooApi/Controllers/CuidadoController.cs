using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZooApi.Data;
using ZooApi.DTOs;
using ZooApi.Models;

namespace ZooApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CuidadoController : ControllerBase
    {
        private readonly ZooContext _context;

        public CuidadoController(ZooContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cuidado>>> GetAll()
        {
            return await _context.Cuidados
                .Include(c => c.AnimaisCuidados)
                    .ThenInclude(ac => ac.Animal)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cuidado>> GetById(int id)
        {
            var cuidado = await _context.Cuidados
                .Include(c => c.AnimaisCuidados)
                    .ThenInclude(ac => ac.Animal)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cuidado == null)
                return NotFound("Cuidado não encontrado.");

            return cuidado;
        }

        [HttpPost]
        public async Task<ActionResult<Cuidado>> Create([FromBody] CuidadoCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var cuidado = new Cuidado
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                Frequencia = dto.Frequencia
            };

            _context.Cuidados.Add(cuidado);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = cuidado.Id }, cuidado);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CuidadoCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var cuidado = await _context.Cuidados.FindAsync(id);
            if (cuidado == null)
                return NotFound("Cuidado não encontrado.");

            cuidado.Nome = dto.Nome;
            cuidado.Descricao = dto.Descricao;
            cuidado.Frequencia = dto.Frequencia;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var cuidado = await _context.Cuidados.FindAsync(id);
            if (cuidado == null)
                return NotFound("Cuidado não encontrado.");

            _context.Cuidados.Remove(cuidado);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}