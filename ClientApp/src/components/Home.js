import React, { Component } from 'react';
import initialData from './ToyData';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

export class Home extends Component {
  static displayName = Home.name;
	state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const columns = this.state.columns;

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    const startTaskIds = Array.from(start.taskIds);
    const finishTaskIds = Array.from(finish.taskIds);

    const sameColumn = destination.droppableId === source.droppableId;

    startTaskIds.splice(source.index, 1);
    if (sameColumn) {
      startTaskIds.splice(destination.index, 0, draggableId);
    } else {
      finishTaskIds.splice(destination.index, 0, draggableId);
    }

    columns[source.droppableId] = {
      ...start,
      taskIds: startTaskIds
    }
    if (!sameColumn) {
      columns[destination.droppableId] = {
        ...finish,
        taskIds: finishTaskIds
      }
    }
    
    this.setState({
      columns: columns
    })
   
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <Container>
        {
          this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks}/>
          })
          }
        </Container>
      </DragDropContext>
    )
  }
}
