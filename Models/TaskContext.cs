using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Models
{
  public class TaskContext : DbContext
  {
    public TaskContext(DbContextOptions<TaskContext> options)
      :base(options)
    {
    }

    public DbSet<TaskItem> TaskItems { get; set; }
  }
}
