import React from 'react';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';
import styled from 'styled-components';


const ButtonContainer = styled.div`
  margin-top: 8px;
`

export default class IssueModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      taskId: this.props.taskId,
      modalOpen: true
    }
  }

  onSaveButtonClicked() {
    // Do things on clicking save
  }

  render() {
    return (
      <Modal
        isOpen={this.state.modalOpen}
      >
        <ModalHeader>
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