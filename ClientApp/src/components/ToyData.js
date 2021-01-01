const initialData = {
  tasks: {
    'task-1': { id: 'task-1', description: 'First task' },
    'task-2': { id: 'task-2', description: 'Second task' },
    'task-3': { id: 'task-3', description: 'Third task' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'column 1 title',
      taskIds: ['task-1', 'task-2', 'task-3']
    },
    'column-2': {
      id: 'column-2',
      title: 'column 2 title',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'column 3 title',
      taskIds: []
    }
  },
  columnOrder: ['column-1', 'column-2', 'column-3']
};

export default initialData;