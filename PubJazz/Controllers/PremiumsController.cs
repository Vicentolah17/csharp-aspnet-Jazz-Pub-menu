using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PubJazz.Data;
using PubJazz.Models;

namespace PubJazz.Controllers
{
    [ApiController] // <-- Isso diz que é uma API Controller
    [Route("api/[controller]")] // <-- Isso define a URL: /api/Premiums
    public class PremiumsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // Injeção de dependência (igual nas Razor Pages)
        public PremiumsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /api/Premiums
        [HttpGet]
        public async Task<IActionResult> GetPremiums()
        {
            // Busca todos os premiums (incluindo o Cliente relacionado)
            var premiums = await _context.Premiums
                                         .Include(p => p.Client) // Opcional, mas bom
                                         .ToListAsync();
            
            // Retorna um JSON com a lista
            return Ok(premiums); 
        }

        // GET: /api/Premiums/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPremium(int id)
        {
            var premium = await _context.Premiums
                                        .Include(p => p.Client)
                                        .FirstOrDefaultAsync(p => p.Id == id);

            if (premium == null)
            {
                return NotFound();
            }
            return Ok(premium);
        }

        // POST: /api/Premiums
        [HttpPost]
        public async Task<IActionResult> PostPremium([FromBody] Premium premium)
        {



            premium.StartDate = DateTime.Now;
            premium.EndDate = DateTime.Now.AddDays(7);

            _context.Premiums.Add(premium);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetPremium), new { id = premium.Id }, premium);
        }

        // DELETE: /api/Premiums/
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePremium(int id)
        {
            var premium = await _context.Premiums.FindAsync(id);
            if (premium == null)
            {
                return NotFound();
            }

            _context.Premiums.Remove(premium);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        // PUT: /api/Premiums/
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPremium(int id, [FromBody] Premium premium)
        {
            

            if (id != premium.Id)
            {
                
                return BadRequest("ID do objeto não confere com o ID da URL.");
            }

            
            var premiumOriginal = await _context.Premiums.FindAsync(id);
            if (premiumOriginal == null)
            {
                return NotFound("Premium não encontrado.");
            }

            
            premiumOriginal.Title = premium.Title;
            

            try
            {
                _context.Entry(premiumOriginal).State = EntityState.Modified; 
                await _context.SaveChangesAsync(); 
            }
            catch (DbUpdateConcurrencyException)
            {
                
                if (!_context.Premiums.Any(e => e.Id == id))
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
    }
}