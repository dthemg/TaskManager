using System.Collections.Generic;

namespace TaskManager.Models
{
	public class EpicItem
	{
		public long Id { get; set; }
		public string description { get; set; }
		public string title { get; set; }
		public string status { get; set; }
		public virtual ICollection<TaskItem> TaskItems { get; set; }
	}
}
