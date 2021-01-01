import React from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalHeader } from 'reactstrap';
import styled from 'styled-components';

const resolutionAlternatives = [
	"Done",
	"Can't reproduce",
	"Duplicate",
	"Won't do"
]

const Container = styled.div`
	margin: 8px;
	flex-grow: 1;
	min-height: 100px;
	flex-direction: column;
`;

const DropdownContainer = styled.div`
	margin-top: 8px;
`;

const ButtonContainer = styled.div`
	margin-top: 8px;
`;


export class TaskModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			modalOpen: true,
			dropDownOpen: false,
			resolution: "Resolution",
			saveButtonDisabled: true
		};
		this.toggleModalOpen = this.toggleModalOpen.bind(this);
		this.toggleDropdownOpen = this.toggleDropdownOpen.bind(this);
		this.handleDropdownChange = this.handleDropdownChange.bind(this);
	}

	toggleModalOpen = () => {
		this.setState({
			modalOpen: !this.state.modalOpen
		});
	};

	toggleDropdownOpen = () => {
		this.setState({
			dropDownOpen: !this.state.dropDownOpen
		})
	}

	handleDropdownChange = (event) => {
		this.setState({
			resolution: event.currentTarget.textContent,
			saveButtonDisabled: false
		})
	}

	onSaveButtonClicked = (event) => {
		this.props.onModalSave(this.state.resolution)
	}

	render() {
		return (
			<Modal 
				isOpen={this.state.modalOpen}
				onClosed={this.props.onModalClose}
			>
				<ModalHeader toggle={this.toggleModalOpen}>
					Task resolution - {this.props.task.title}
				</ModalHeader>
				<ModalBody>
					<Container>
					<h4>Select resolution:</h4>
					<DropdownContainer>
					<Dropdown
						isOpen={this.state.dropDownOpen} 
						toggle={this.toggleDropdownOpen}
						size="sm"
					>
						<DropdownToggle caret>
							{this.state.resolution}
						</DropdownToggle>
						<DropdownMenu>
							{resolutionAlternatives.map((alternative, index) => {
								return (
									<DropdownItem 
										key={index} 
										name={alternative}
										onClick={this.handleDropdownChange}
									>
										{alternative}
									</DropdownItem>
								)
							})}
						</DropdownMenu>
					</Dropdown>
					</DropdownContainer>
					<h4>Description:</h4>
					{this.props.task.description}
					<ButtonContainer>
						<Button 
							color={this.state.saveButtonDisabled ? "secondary": "primary"} 
							disabled={this.state.saveButtonDisabled}
							size="sm"
							onClick={this.onSaveButtonClicked}
						>
							Save
						</Button>
					</ButtonContainer>
					</Container>
				</ModalBody>
			</Modal>
		)
	}
};

export default TaskModal;