using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManager.Models
{
  public class TaskItem
  {
    public long Id { get; set; }
    public string title { get; set; }
    public string assignee { get; set; }
  }
}
