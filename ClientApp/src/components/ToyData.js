const initialData = {
	tasks: {
		'task-1': { 
			id: 'task-1', 
			title: 'First task', 
			description: 'First description', 
			assignee: null,
			resolution: null
		},
		'task-2': { 
			id: 'task-2', 
			title: 'Second task', 
			description: 'Second description', 
			assignee: null,
			resolution: null
		},
		'task-3': { 
			id: 'task-3', 
			title: 'Third task', 
			description: 'Third description', 
			assignee: null,
			resolution: null
		},
		'task-4': { 
			id: 'task-4', 
			title: 'Fourth task', 
			description: 'Fourth description', 
			assignee: "David Montgomery",
			resolution: null
		}
	},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'TODO',
			taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
		},
		'column-2': {
			id: 'column-2',
			title: 'In Progress',
			taskIds: [],
		},
		'column-3': {
			id: 'column-3',
			title: 'In Review',
			taskIds: []
		},
		'column-4': {
			id: 'column-4',
			title: 'Done',
			taskIds: []
		}
	},
	columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
};

export default initialData;