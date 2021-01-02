import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const TaskBox = styled.div`
	border: 1px solid lightgrey;
	border-radius: 2px;
	padding: 8px;
	margin: 8px;
	background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Header = styled.div`
	display: flex;
`;

const UserIcon = styled.div`
	width: 20px;
	height: 20px;
	background-color: orange;
	border-radius: 4px;
	margin-right: 8px;
`;

const Assignee = styled.p`
	font-size: 12px;
	font-style: italic;
`;

const TaskTitle = styled.a`
	font-size: 14px;
	font-weight: bold;
	margin: 0;
	text-decoration: ${props => (props.columnId === 'column-4' ? 'line-through' : null)};
	href: '#';
`;

const Description = styled.p`
	text-decoration: ${props => (props.columnId === 'column-4' ? 'line-through' : null)};
`;

export default class Task extends React.Component {

	onClickTask = (event) => {
		this.props.onClickTask(this.props.task.id);
	}

	render() {
		return (
		<Draggable
			draggableId={this.props.task.id}
			index={this.props.index}
		>
			{ (provided, snapshot) => (
			<TaskBox
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				ref={provided.innerRef}
				isDragging={snapshot.isDragging}
			>
				<Header>
					<UserIcon />
					<TaskTitle columnId={this.props.columnId} onClick={() => this.onClickTask(this.props.task.id)}>
						{this.props.task.title}
					</TaskTitle>
				</Header>
				<Description columnId={this.props.columnId}>
					{this.props.task.description}
				</Description>
				<Assignee>
					{this.props.task.assignee ? this.props.task.assignee : "Unassigned"}
				</Assignee>
			</TaskBox>
			)}
		</Draggable>
		);
	}
}