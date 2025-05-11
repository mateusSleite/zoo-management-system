using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZooApi.Data;
using ZooApi.DTOs;
using ZooApi.Models;

namespace ZooApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnimalController : ControllerBase
    {
        private readonly ZooContext _context;

        public AnimalController(ZooContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Animal>>> GetAll()
        {
            return await _context.Animais
                .Include(a => a.AnimaisCuidados)
                    .ThenInclude(ac => ac.Cuidado)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Animal>> GetById(int id)
        {
            var animal = await _context.Animais
                .Include(a => a.AnimaisCuidados)
                    .ThenInclude(ac => ac.Cuidado)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (animal == null)
                return NotFound();

            return animal;
        }

        [HttpPost]
        public async Task<ActionResult<Animal>> Create([FromBody] AnimalCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Validação de existência dos cuidados
            var cuidadosExistentes = await _context.Cuidados
                .Where(c => dto.CuidadosSelecionados.Contains(c.Id))
                .Select(c => c.Id)
                .ToListAsync();

            if (cuidadosExistentes.Count != dto.CuidadosSelecionados.Count)
                return BadRequest("Um ou mais cuidados selecionados são inválidos.");

            var animal = new Animal
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao,
                DataNascimento = dto.DataNascimento,
                Especie = dto.Especie,
                Habitat = dto.Habitat,
                PaisOrigem = dto.PaisOrigem,
                AnimaisCuidados = dto.CuidadosSelecionados.Select(cuidadoId => new AnimalCuidado
                {
                    CuidadoId = cuidadoId
                }).ToList()
            };

            _context.Animais.Add(animal);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = animal.Id }, animal);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AnimalCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var animal = await _context.Animais
                .Include(a => a.AnimaisCuidados)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (animal == null)
                return NotFound();

            // Validação de existência dos cuidados
            var cuidadosExistentes = await _context.Cuidados
                .Where(c => dto.CuidadosSelecionados.Contains(c.Id))
                .Select(c => c.Id)
                .ToListAsync();

            if (cuidadosExistentes.Count != dto.CuidadosSelecionados.Count)
                return BadRequest("Um ou mais cuidados selecionados são inválidos.");

            animal.Nome = dto.Nome;
            animal.Descricao = dto.Descricao;
            animal.DataNascimento = dto.DataNascimento;
            animal.Especie = dto.Especie;
            animal.Habitat = dto.Habitat;
            animal.PaisOrigem = dto.PaisOrigem;

            animal.AnimaisCuidados.Clear();
            animal.AnimaisCuidados = dto.CuidadosSelecionados
                .Select(cuidadoId => new AnimalCuidado { CuidadoId = cuidadoId })
                .ToList();

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var animal = await _context.Animais.FindAsync(id);
            if (animal == null)
                return NotFound();

            _context.Animais.Remove(animal);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}