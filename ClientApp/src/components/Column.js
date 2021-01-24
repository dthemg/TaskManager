import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './Task';

const ColumnContainer = styled.div`
	margin: 4px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	flex-grow: 1;
	flex-basis: 0;
	display: flex;
	flex-direction: column;
`;

const Title = styled.h3`
	padding-top: 8px;
	padding-bottom: 8px;
	padding-left: 2px;
	padding-right: 2px;
	text-align: center;
	background-color: rgb(245, 225, 177);
`;

const TaskList = styled.div`
	transition: background-color 0.2s ease;
	background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'white')};
	min-height: 50px;
	min-width: 120px;
	flex-grow: 1;
`;

class InnerList extends React.PureComponent {
	render() {
		return this.props.tasks.map((task, index) => (
			<Task
				key={task.id}
				task={task}
				index={index}
				onClickTask={this.props.onClickTask}
				columnId={this.props.columnId}
			/>)
		);
	}
}

export default class Column extends React.Component {
	render() {
		return (
		<ColumnContainer>
			<Title>{this.props.column.title}</Title>
			<Droppable droppableId={ this.props.column.id }>
			{(provided, snapshot) => (
				<TaskList
				ref={provided.innerRef}
				{...provided.droppableProps}
				isDraggingOver={snapshot.isDraggingOver}
				>
				<InnerList 
					tasks={this.props.tasks} 
					columnId={this.props.column.id}
					onClickTask={this.props.onClickTask}
				/>
				{provided.placeholder}
				</TaskList>
			)}
			</Droppable>
		</ColumnContainer>
		)
	}
}
