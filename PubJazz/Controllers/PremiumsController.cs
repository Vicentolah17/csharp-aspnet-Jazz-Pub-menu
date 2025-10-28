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

        // GET: /api/Premiums/5 (para pegar um só)
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

        // (Depois você pode adicionar [HttpPost], [HttpPut], [HttpDelete]...)
    }
}