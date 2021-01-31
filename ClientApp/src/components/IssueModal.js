import React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import styled from 'styled-components';
import { loadTaskDetails, changeTaskAssignee } from '../utils/requests';
import axios from 'axios';

const ButtonContainer = styled.div`
  margin-top: 8px;
`

export default class IssueModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      taskId: this.props.taskId,
      modalOpen: true,
      loading: true,
      taskData: null,
      teamMembers: []
    }
    this.axiosCancelHandler = axios.CancelToken.source();
    this.onLoadTask = this.onLoadTask.bind(this);
    this.toggleModalOpen = this.toggleModalOpen.bind(this);
  }

  onLoadTask(taskData) {
    this.setState({
      loading: false,
      taskData: taskData,
      teamMembers: ['Jonas', 'David', 'Fredrik']
    })
  }

  toggleModalOpen() {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
    this.props.onIssueClose();
  }

  componentDidMount() {
    let options = { cancelToken: this.axiosCancelHandler.token };
    loadTaskDetails(this.props.taskId, this.onLoadTask, options);
  }

  onSaveButtonClicked() {
    console.log("Save button clicked");
    // Do things on clicking save
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalOpen}
      >
        <ModalHeader toggle={this.toggleModalOpen}>
          Task {this.state.taskId}
        </ModalHeader>
        <ModalBody>
          Here goes the task data
          <ButtonContainer>
            <Button
              color="primary"
              size="sm"
              onClick={this.onSaveButtonClicked}
            >
              Save
            </Button>
          </ButtonContainer>
        </ModalBody>
        
      </Modal>
    )
  }

}