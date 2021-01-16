using System.Collections.Generic;
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
        public virtual List<Comment> comments { get; set; }

        public long EpicItemId { get; set; }
    }

    public class Comment
    {
        public long Id { get; set; }
        public string commentText { get; set; }
    }

}

