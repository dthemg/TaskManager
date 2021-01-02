import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	margin: 8px;
`

export class TaskDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {taskData: null, loading: true};
	}

	componentDidMount() {
		this.populateTaskData();
	}

	async populateTaskData() {
		// Sample response
		const data = {
			'abc': 123
		}
		this.setState({taskData: data});
	}

	render() {
		return (
			<Container>
				<p>Here goes the sidebar</p>
			</Container>
		)		
	}
}

export default TaskDetails;