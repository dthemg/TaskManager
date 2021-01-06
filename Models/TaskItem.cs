using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
  public class TaskItem
  {
    public long Id { get; set; }
    public string title { get; set; }
    public string assignee { get; set; }
    public string longDescription { get; set; }
    public string status { get; set; }
    
    // Does not work?
    // You can't have a list of strings like this - because you cant have a list
    // in a SQL table cell
    //public IEnumerable<string> comments { get; set; }
  }

}

