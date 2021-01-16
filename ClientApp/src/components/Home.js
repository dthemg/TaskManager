import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';
import TaskDetails from './TaskDetails';
import TaskModal from './TaskModal';
import { loadEpic, EMPTY_COLUMNS } from '../utils/requests';

const DragDropContainer = styled.div`
	display: flex;
	overflow: auto;
	height: 100%;
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
`

const columnOrder = ['todo', 'in-progress', 'in-review', 'done']

export class Home extends Component {
	static displayName = Home.name;
	state = {
		tasks: {},
		columnOrder: columnOrder,
		columns: EMPTY_COLUMNS,
		modalOpen: false,
		previousStartColumn: null,
		previousFinishColumn: null,
		modalTask: null,
		detailsOpen: false,
		detailsId: null
	};

	constructor(props) {
		super(props);
		this.onLoadEpic = this.onLoadEpic.bind(this);
	}

	componentDidMount() {
		loadEpic("4", this.onLoadEpic);
  }

	onLoadEpic(newTasks, newColumns) {
		this.setState({
			tasks: newTasks,
			columns: newColumns
		});
  }

	updateTaskState = (destination, source, draggableId, sameColumn) => {
		const columns = this.state.columns;
		const start = columns[source.droppableId];
		const finish = columns[destination.droppableId];
		const startTaskIds = Array.from(start.taskIds);
		const finishTaskIds = Array.from(finish.taskIds);
	
		if (sameColumn) {
			startTaskIds.splice(source.index, 1);
			startTaskIds.splice(destination.index, 0, draggableId);
		
			columns[source.droppableId] = {
				...start,
				taskIds: startTaskIds
			}
		} else {
			// Save previous states for modal cancellation
			if (destination.droppableId === "done") {
				this.setState({
					previousStartColumn: {
						...start,
						taskIds: startTaskIds.slice()
					},
					previousFinishColumn: {
						...finish, 
						taskIds: finishTaskIds.slice()
					}
				})
			}
			
			startTaskIds.splice(source.index, 1);
			finishTaskIds.splice(destination.index, 0, draggableId);

			columns[source.droppableId] = {
				...start,
				taskIds: startTaskIds
			}
			columns[destination.droppableId] = {
				...finish,
				taskIds: finishTaskIds
			}
		}
		
		this.setState({
			columns: columns
		})
	};

	exitTaskDetails = () => {
		this.setState({detailsOpen: false})
	}

	onModalClose = result => {
		this.setState({
			modalOpen: false
		});

		// Revert columns to previous state
		const prevStartColumnId = this.state.previousStartColumn.id;
		const prevFinishColumnId = this.state.previousFinishColumn.id;

		const columns = this.state.columns
		columns[prevStartColumnId] = this.state.previousStartColumn;
		columns[prevFinishColumnId] = this.state.previousFinishColumn;

		this.setState({
			columns: columns
		})
	}

	getModalTaskId = () => {
		const taskId = this.state.columns[this.state.modalTask.droppableId]
			.taskIds[this.state.modalTask.index];
		return taskId;
	}
		
	onModalSave = resolution => {
		const taskId = this.getModalTaskId();
		var task = this.state.tasks[taskId];
		task.resolution = resolution;
		this.setState({
			modalOpen: false,
			tasks: {
				...this.state.tasks,
				taskId: task
			}
		});
	}

	onClickTask = (taskId) => {
		this.setState({
			detailsOpen: true,
			detailsId: taskId
		});
	}

	onChangeTaskAssignee = (taskId, assignee) => {
		const task = this.state.tasks[taskId];
		task.assignee = assignee
		this.setState({
			tasks: {
				...this.state.tasks,
				taskId: task
			}
		});
	} 

	notNull = obj => {
		return obj && obj !== 'null' && obj !== 'undefined';
	}

	onDragEnd = result => {
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const sameColumn = destination.droppableId === source.droppableId;

		if (destination.droppableId === "done") {
			this.setState({ modalOpen: true, modalTask: destination });
		}
		
		this.updateTaskState(destination, source, draggableId, sameColumn)
	};

	render() {
		var task = null;
		if (this.notNull(this.state.modalTask)) {
			task = this.state.tasks[this.getModalTaskId()];
		}
		const modal = (
			this.state.modalOpen ? 
				<TaskModal 
					onModalClose={this.onModalClose} 
					onModalSave={this.onModalSave} 
					task={task}
				/> : null
		);
		const taskDetails = (
			this.state.detailsOpen ? 
				<TaskDetails 
					exitTaskDetails={this.exitTaskDetails}
					onChangeTaskAssignee={this.onChangeTaskAssignee}
					taskId={this.state.detailsId}
				/> : null
		);

		return (
			<Container>
				<DragDropContainer>
					{modal}
					<DragDropContext
						onDragEnd={this.onDragEnd}
					>
						{
							this.state.columnOrder.map((columnId) => {
								const column = this.state.columns[columnId];
								const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
								return (
									<Column 
										key={column.id} 
										column={column} 
										tasks={tasks}
										onClickTask={this.onClickTask}
									/>
								)
							})
						}
						
					</DragDropContext>
				</DragDropContainer>
				{taskDetails}
			</Container>
		)
	};
}
