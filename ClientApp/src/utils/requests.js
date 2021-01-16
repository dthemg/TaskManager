import axios from 'axios';
import { EPIC_URL, TASK_URL, CHANGE_TASK_ASSIGNEE_URL } from '../configuration/Urls';

/* Drag-n-drop data format */
export const EMPTY_COLUMNS = {
  'todo': {
    id: 'todo',
    title: 'TODO',
    taskIds: []
  },
  'in-progress': {
    id: 'in-progress',
    title: 'In Progress',
    taskIds: [],
  },
  'in-review': {
    id: 'in-review',
    title: 'In Review',
    taskIds: []
  },
  'done': {
    id: 'done',
    title: 'Done',
    taskIds: []
  }
};

export async function loadEpic(epicId, onLoad) {
  /* Load epic into a drag-n-drop-friendly format */
  const url = `${EPIC_URL}${epicId.toString()}`;
  axios.get(url)
    .then((response) => {
      var data = response.data;
      var newTasks = {};
      var newColumns = EMPTY_COLUMNS;

      data.taskItems.forEach(function (item, idx) {
        var id = item.id.toString();
        newColumns["todo"]["taskIds"].push(id);
        newTasks[id] = {
          ...item,
          id: id,
          resolution: null
        }
      });
      onLoad(newTasks, newColumns);
    })
    .catch((error) => {
      console.error(error);
    });
};

export async function loadTaskDetails(taskId, onLoad) {
  /* Load task details */
  const url = `${TASK_URL}${taskId.toString()}`;
  axios.get(url)
    .then((response) => {
      var data = response.data;
      onLoad(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function changeTaskAssignee(taskId, newAssignee, onLoad) {
  /* Change which user is assigned to a task */
  const url = `${CHANGE_TASK_ASSIGNEE_URL}${taskId}/${newAssignee}`;
  axios.put(url)
    .then((response) => {
      if (response.status === 204) {
        onLoad(newAssignee)
      } else {
        console.error(`Update not successful: ${response.status}`)
      }
    })
    .catch((error) => {
      console.error(error)
    });
}
