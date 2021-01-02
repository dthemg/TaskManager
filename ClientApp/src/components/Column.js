import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from './Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'white')};
  flex-grow: 1;
  min-height: 100px;
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
		<Container>
			<Title>{this.props.column.title}</Title>
			<Droppable droppableId={ this.props.column.id }>
			{ (provided, snapshot) => (
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
		</Container>
		)
	}
}
