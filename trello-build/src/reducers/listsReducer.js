import { CONSTANTS } from "../actions";


const initialState = [
  {
    title: "TO DO",
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: "Implement a ReactJS web page with two columns and multiple cards (at least 2 cards)"
      },
      {
        id: `card-${1}`,
        text: "All data should come from a JSON data file"
      }
    ]
  },
  {
    title: "DONE",
    id: `list-${1}`,
    cards: [
      {
        id: `card-${2}`,
        text: "Card face should only display Title and Owner"
      },
      {
        id: `card-${3}`,
        text: "Cards should be able to move between columns and within each column (order changes)"
      },
      {
        id: `card-${4}`,
        text:
          "Users should be able to look at the web app on a small, medium and large viewport"
      }
    ]
  }
];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        type
      } = action.payload;
      const newState = [...state];

      // draggin lists around
      if (type === "list") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find(list => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = state.find(list => droppableIdStart === list.id);
        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = state.find(list => droppableIdEnd === list.id);

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;

   

    default:
      return state;
  }
};

export default listsReducer;