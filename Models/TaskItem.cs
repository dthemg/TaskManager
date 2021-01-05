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
    public string longDescription { get; set; }
    public string status { get; set; }
    
    // Does not work?
    //public List<Comment> comments { get; set; }
  }

  public class Comment
  {
    public long Id { get; set; }
    public string comment_text { get; set; }
  }

}

