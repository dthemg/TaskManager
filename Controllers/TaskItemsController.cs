﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

// https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskItemsController : ControllerBase
    {
        private readonly Context _context;

        public TaskItemsController(Context context)
        {
            _context = context;
        }

        // GET: api/TaskItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTaskItems()
        {
            return await _context.TaskItems.ToListAsync();
        }

        // GET: api/TaskItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTaskItem(long id)
        {
            var taskItem = await _context.TaskItems.FindAsync(id);

            if (taskItem == null)
            {
                return NotFound();
            }

            return taskItem;
        }

        // PUT: api/TaskItems/changeResolution/5
        [HttpPut("changeResolution/{id}/{newResolution}")]
        public async Task<IActionResult> PutTaskResolution(long id, string newResolution)
		{
            var task = new TaskItem() { Id = id, resolution = newResolution };
            try 
            {
                _context.TaskItems.Attach(task);
                _context.Entry(task).Property(item => item.resolution).IsModified = true;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
			{
                if (!TaskItemExists(id))
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

        // PUT: api/TaskItems/changeAssignee/5
        [HttpPut("changeAssignee/{id}/{newAssignee}")]
        public async Task<IActionResult> PutTaskAssignee(long id, string newAssignee)
		{
            var task = new TaskItem() { Id = id, assignee = newAssignee };
            try 
            {
                _context.TaskItems.Attach(task);
                _context.Entry(task).Property(item => item.assignee).IsModified = true;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
			{
                if (!TaskItemExists(id))
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



        // PUT: api/TaskItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskItem(long id, TaskItem taskItem)
        {
            if (id != taskItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(taskItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskItemExists(id))
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

        // POST: api/TaskItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TaskItem>> PostTaskItem(TaskItem taskItem)
        {
            _context.TaskItems.Add(taskItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaskItem), new { id = taskItem.Id }, taskItem);
        }

        // DELETE: api/TaskItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskItem(long id)
        {
            var taskItem = await _context.TaskItems.FindAsync(id);
            if (taskItem == null)
            {
                return NotFound();
            }

            _context.TaskItems.Remove(taskItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskItemExists(long id)
        {
            return _context.TaskItems.Any(e => e.Id == id);
        }
    }
}
