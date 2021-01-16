import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Input, Label } from 'reactstrap';
import styled from 'styled-components';
import { loadTaskDetails, changeTaskAssignee } from '../utils/requests';

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
		this.onLoadTask = this.onLoadTask.bind(this);
		this.onAssigneeWasChanged = this.onAssigneeWasChanged.bind(this);
	}

	componentDidMount() {
		loadTaskDetails(this.props.taskId, this.onLoadTask);
	}

	onLoadTask(taskData) {
		this.setState({
			loading: false,
			taskData: taskData,
			teamMembers: ['Jonas', 'David', 'Fredrik']
    })
  }

	onClickExit = (event) => {
		this.props.exitTaskDetails();
	}

	onAssigneeChange = (event) => {
		var newAssignee = event.target.value
		changeTaskAssignee(this.props.taskId, newAssignee, this.onAssigneeWasChanged);
	}

	onAssigneeWasChanged(newAssignee) {
		this.setState({
			taskData: {
				...this.state.taskData,
				assignee: newAssignee
			}
		})
		this.props.onChangeTaskAssignee(this.props.taskId, newAssignee)
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
		console.log(this.state.taskData);
		const resolution = loading ? spinner : (
			this.state.taskData.status === "done" ? null : (
				<div>
					<h5>Resolution</h5>
					{this.state.taskData.resolution}
				</div>
			)
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
					{resolution}
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