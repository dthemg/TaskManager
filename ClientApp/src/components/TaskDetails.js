import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Input, Label } from 'reactstrap';
import styled from 'styled-components';
import axios from 'axios';

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
			teamMembers: null
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
		//const response = await fetch('taskdata');
		//const data = await response.json();
		const taskId = "1"
		const getTaskUrl = "https://localhost:5001/api/TaskItems/".concat(taskId);

		var self = this;
		axios.get(getTaskUrl)
			.then((response) => {
				var data = response.data;
				console.log(data);
				self.setState({
					taskData: {
						'title': data.title,
						'assignee': data.assignee,
						'long_description': data.longDescription,
						'status': data.status,
						'id': data.id,
						'comments': [
							'This is one comment',
							'This is another comment'
						]
					},
					teamMembers: [
						'Jonas', 'David', 'Fredrik'
					],
					loading: false
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	onAssigneeChange = (event) => {
		const taskId = 1
		const putTaskUrl = "https://localhost:5001/api/TaskItems/".concat(taskId.toString())
		var newAssignee = event.target.value
		const newTaskData = {
			id: taskId,
			assignee: newAssignee,
			longDescription: this.state.taskData.long_description,
			status: this.state.taskData.status,
			title: this.state.taskData.title
		}
		
		axios.put(putTaskUrl, newTaskData)
			.then(response => {
				console.log(response);
				console.log(newAssignee);
				if (response.status === 204) {
					this.setState({
						taskData: {
							...this.state.taskData,
							assignee: newAssignee
						}
					});
					// Below does not work for some reason...
					//self.props.onChangeTaskAssignee(self.state.taskData.id, newAssignee);
				} else {
					console.log("Update did not work as expected", response.status);
        }
				
			})
			.catch(error => {
				console.log(error);
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