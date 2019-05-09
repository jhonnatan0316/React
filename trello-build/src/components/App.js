import React, { PureComponent } from "react";
import TrelloList from "./TrelloList";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort } from "../actions";
import Modal from './Modal';
const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;


class App extends PureComponent {
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  constructor() {
    super();

    this.state = {
        isShowing: false
    }
}

  openModalHandler = () => {
    this.setState({
        isShowing: true
    });
}

closeModalHandler = () => {
    this.setState({
        isShowing: false
    });
}
  render() {
    const { lists } = this.props;
    return (
      <div> 
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div onClick={this.openModalHandler}>
        { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
        <h2>HelloBuild Trello</h2>
        </div>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <ListsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lists.map((list, index) => (
                <TrelloList
                  listID={list.id}
                  key={list.id}
                  title={list.title}
                  cards={list.cards}
                  index={index}
                />
              ))}
            
              {provided.placeholder}
           
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext>
      <Modal
            show={this.state.isShowing}
            close={this.closeModalHandler}>
                The expanded version of the card should also display the description and float up as a modal in the middle of the screen.
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);