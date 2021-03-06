import { ADD_CARD, ADD_DECK, RECEIVE_DECKS, REMOVE_DECK } from '../actions';


function decks(state = null, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks;

    case ADD_DECK:
      return {
        ...(state || {}),
        [action.deck.id]: action.deck,
      };

    case REMOVE_DECK:
      const newState = {...state};
      delete newState[action.deck.id];
      return newState;

    case ADD_CARD:
      const deck = state[action.deckId];
      const newDeck = {
        ...deck,
        questions: [...deck.questions, action.card],
      };
      return {
        ...(state || {}),
        [action.deckId]: newDeck,
      };

    default:
      return state;
  }
}


export default decks;
