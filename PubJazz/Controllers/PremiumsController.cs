using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PubJazz.Data;
using PubJazz.Models;

namespace PubJazz.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PremiumsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PremiumsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: /api/Premiums
        [HttpGet]
        public async Task<IActionResult> GetPremiums()
        {
            // Removido .Include(p => p.Client) - Erros 26 e 38 morrem aqui
            var premiums = await _context.Premiums.ToListAsync();
            return Ok(premiums); 
        }

        // GET: /api/Premiums/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPremium(int id)
        {
            var premium = await _context.Premiums.FindAsync(id);

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
            // Removidas as linhas de StartDate/EndDate - Erros 55 e 56 morrem aqui
            _context.Premiums.Add(premium);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPremium), new { id = premium.Id }, premium);
        }

        // DELETE: /api/Premiums/5
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
        
        // PUT: /api/Premiums/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPremium(int id, [FromBody] Premium premium)
        {
            if (id != premium.Id)
            {
                return BadRequest("ID não confere.");
            }

            var premiumOriginal = await _context.Premiums.FindAsync(id);
            if (premiumOriginal == null)
            {
                return NotFound();
            }

            // Atualizando com os novos campos do cardápio
            premiumOriginal.Title = premium.Title;
            premiumOriginal.Type = premium.Type;
            premiumOriginal.Origin = premium.Origin;
            premiumOriginal.Age = premium.Age;
            premiumOriginal.Price = premium.Price;
            premiumOriginal.Description = premium.Description;

            try
            {
                _context.Entry(premiumOriginal).State = EntityState.Modified; 
                await _context.SaveChangesAsync(); 
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Premiums.Any(e => e.Id == id)) return NotFound();
                else throw;
            }

            return NoContent(); 
        }
    }
}