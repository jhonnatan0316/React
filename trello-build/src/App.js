import React, { PureComponent } from "react";
import TrelloList from "./components/TrelloList";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort } from "./actions";
import DetailsModal from './components/DetailsModal';
const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const TitleContainer = styled.h2`
  text-align: center;
  background-color: #ffc680;
`;


class App extends PureComponent {
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

  render() {
    const { lists } = this.props;
    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div onClick={this.openModalHandler}>
            <TitleContainer >HelloBuild Trello</TitleContainer>
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
        
        {this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null}
        <DetailsModal
          className="modal"
          show={this.state.isShowing}
          close={this.closeModalHandler}>
          {this.props.list}
        </DetailsModal>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);