import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Input, Label } from 'reactstrap';
import styled from 'styled-components';
import axios from 'axios';
import { TASK_URL, CHANGE_TASK_ASSIGNEE_URL } from '../configuration/Urls';

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
		const getTaskURL = TASK_URL.concat(this.props.taskId.toString());

		var self = this;
		axios.get(getTaskURL)
			.then((response) => {
				var data = response.data;
				self.setState({
					taskData: {
						'title': data.title,
						'assignee': data.assignee,
						'longDescription': data.longDescription,
						'status': data.status,
						'id': data.id,
						'comments': data.comments
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
		var newAssignee = event.target.value
		this.changeAssignee(newAssignee);
	}

	async changeAssignee(newAssignee) {
		const putTaskUrl = `${CHANGE_TASK_ASSIGNEE_URL}${this.props.taskId}/${newAssignee}`;

		axios.put(putTaskUrl)
			.then(response => {
				if (response.status === 204) {
					this.setState({
						taskData: {
							...this.state.taskData,
							assignee: newAssignee

						}
						});
					this.props.onChangeTaskAssignee('10', newAssignee);
				} else {
					console.error("Update did not work as expected", response);
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
		const description = loading ? spinner : this.state.taskData.longDescription; 
		const assignee = loading ? spinner : this.renderAssigneeDropdown();
		const comments = loading ? spinner : (
			this.state.taskData.comments.map((item, index) => <p key={index}>{item.commentText}</p>)
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