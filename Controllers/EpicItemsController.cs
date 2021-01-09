using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EpicItemsController : ControllerBase
    {
        private readonly Context _context;

        public EpicItemsController(Context context)
        {
            _context = context;
        }

        // GET: api/EpicItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EpicItem>>> GetEpicItems()
        {
            return await _context.EpicItems.ToListAsync();
        }

        // GET: api/EpicItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EpicItem>> GetEpicItem(long id)
        {
            var epicItem = await _context.EpicItems.FindAsync(id);

            if (epicItem == null)
            {
                return NotFound();
            }

            return epicItem;
        }

        // PUT: api/EpicItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEpicItem(long id, EpicItem epicItem)
        {
            if (id != epicItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(epicItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EpicItemExists(id))
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

        // POST: api/EpicItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EpicItem>> PostEpicItem(EpicItem epicItem)
        {
            _context.EpicItems.Add(epicItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEpicItem), new { id = epicItem.Id }, epicItem);
        }

        // DELETE: api/EpicItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEpicItem(long id)
        {
            var epicItem = await _context.EpicItems.FindAsync(id);
            if (epicItem == null)
            {
                return NotFound();
            }

            _context.EpicItems.Remove(epicItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EpicItemExists(long id)
        {
            return _context.EpicItems.Any(e => e.Id == id);
        }
    }
}
