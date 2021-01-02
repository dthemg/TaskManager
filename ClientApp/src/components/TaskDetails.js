import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Input, Label } from 'reactstrap';
import styled from 'styled-components';

const Container = styled.div`
	border: 1px solid lightgrey;
	overflow: visible;
	width: 300px;
	height: 100vh;
	display: flex;
	position: relative;
	padding: 16px;
`

const Cross = styled.img`
	position: absolute;
	right: 16px;
	top: 16px;
`

export class TaskDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			taskData: null, 
			loading: true,
			windowWidth: window.innerWidth
		};
		
	}

	componentDidMount() {
		this.populateTaskData();
	}

	onClickExit = (event) => {
		this.props.exitTaskDetails();
	}

	async populateTaskData() {
		// Sample response
		const taskData = {
			'title': 'Task title',
			'long_description': 'This is a longer description that is read from DB',
			'status': 'In progress',
			'assignee': 'Jonas',
			'comments': [
				'This is one comment',
				'This is another comment'
			]
		}
		const teamMembers = [
			'Jonas', 'David', 'Fredrik'
		]

		this.setState({
			taskData: taskData, 
			loading: false, 
			teamMembers: teamMembers
		});
	}

	onAssigneeChange = (event) => {
		this.setState({
			taskData: {
				...this.state.taskData, 
				assignee: event.target.value
			}
		})
	}

	renderAssigneeDropdown = () => {
		return (
			<div>
			<Label for="assigneeSelect">Assignee</Label>
				<Input 
					value={this.state.taskData.assignee} 
					type="select" 
					bsSize="small" 
					name="assignee" 
					id="assigneeSelect"
					onChange={this.onAssigneeChange}
				>
					{this.state.teamMembers.map((value, index) => (
						<option key={index}>{value}</option>
					))}
				</Input>
			</div>
		) 
	}

	render() {
		const x = require('./x.svg')
		const loading = this.state.loading;
		const spinner = <Spinner size="sm" animation="border"/>
		const status = loading ? spinner : this.state.taskData.status;
		const header = loading ? spinner : <h3>{this.state.taskData.title}</h3>;
		const description = loading ? spinner : this.state.taskData.long_description; 
		const assignee = loading ? spinner : this.renderAssigneeDropdown();
		const comments = loading ? spinner : (
			this.state.taskData.comments.map((value, index) => <p key={index}>{value}</p>)
		);
		return (
			<Container>
				<a href="#">
					<Cross src={x} onClick={this.onClickExit}></Cross>
				</a>
				<div>
					{header}
					<h5>Status</h5>
					{status}
					<h5>People</h5>
					{assignee}
					<h5>Description</h5>
					{description}
					<h5>Comments</h5>
					{comments}
				</div>
				
			</Container>
		)		
	}
}

export default TaskDetails;