import { ADD_DECK, RECEIVE_DECKS } from '../actions';


function decks(state = null, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks;

    case ADD_DECK:
      console.log('>', state, action);
      return {
        ...(state || {}),
        [action.deck.id]: action.deck,
      };

    default:
      return state;
  }
}


export default decks;
