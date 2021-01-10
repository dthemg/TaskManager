using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Models
{
    public class Context : DbContext
    {
        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<EpicItem> EpicItems { get; set; }

        public Context(DbContextOptions<Context> options)
            :base(options)
        {
        }
    }
}
