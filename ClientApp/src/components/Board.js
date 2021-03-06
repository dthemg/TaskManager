import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column';
import IssueModal from './IssueModal';
import TaskModal from './ResolutionModal';
import { loadEpic, EMPTY_COLUMNS } from '../utils/requests';
import axios from 'axios';

const DragDropContainer = styled.div`
	display: flex;
	overflow: auto;
	height: 100%;
	width: 100%;
	flex-flow: row;
`;

const Container = styled.div`
	display: flex;
	margin: 0px;
	padding: 0px;
`

const columnOrder = ['todo', 'in-progress', 'in-review', 'done']


export class Board extends Component {
	static displayName = Board.name;

	constructor(props) {
		super(props);
		this.onLoadEpic = this.onLoadEpic.bind(this);

		// Open modal for this task
		let selectedIssue = new URLSearchParams(this.props.location.search).get("selectedIssue");
		let issueModalOpen = (selectedIssue !== null);
		console.log(issueModalOpen);
		this.state = {
			tasks: {},
			columnOrder: columnOrder,
			columns: EMPTY_COLUMNS,
			modalOpen: false,
			previousStartColumn: null,
			modalTask: null,
			detailsOpen: false,
			selectedIssue: selectedIssue
		};
		this.axiosCancelHandler = axios.CancelToken.source();
		this.onIssueClose = this.onIssueClose.bind(this);
	}

	componentDidMount() {
		let options = { cancelToken: this.axiosCancelHandler.token }
		loadEpic("4", this.onLoadEpic, options);
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
		let task = this.state.tasks[taskId];
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
			selectedIssue: taskId,
			issueModalOpen: true
		});
		this.props.history.push(`/board?selectedIssue=${taskId}`);
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

	onIssueClose() {
		this.setState({
			selectedIssue: null,
			issueModalOpen: false
		});
  }

	render() {
		let task = null;
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
		/* Remove taskDetails references when done
		const taskDetails = (
			this.state.detailsOpen ? 
				<TaskDetails 
					exitTaskDetails={this.exitTaskDetails}
					onChangeTaskAssignee={this.onChangeTaskAssignee}
					taskId={this.state.detailsId}
				/> : null
		);
		*/

		const issueModal = (
			this.state.issueModalOpen ? 
				<IssueModal
					taskId={this.state.selectedIssue}
					onIssueClose={this.onIssueClose}
				/> : null
		)
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
				{issueModal}
			</Container>
		)
	};
}
