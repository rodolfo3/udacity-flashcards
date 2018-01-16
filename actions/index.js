export const RECEIVE_DECKS = 'RECEIVE_DECK';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_CARD = 'ADD_CARD';

import { save, load } from '../utils/db';


function generateId() {
  return String(parseInt(Math.random() * 10e15));
}


export function loadDecks() {
  return (dispatch) => {
    load().then(({ decks }) => {
      console.log('decks', decks);
      return dispatch({
        type: RECEIVE_DECKS,
        decks,
      });
    });
  }
}


export function addDeck({ title }) {
  return (dispatch, getState) => {
    const deck = {
      id: generateId(),
      title,
      questions: [],
    };
    // TODO use a better middleware for it
    const action = dispatch({
      type: ADD_DECK,
      deck,
    });
    return save(getState());
  }
}


export function removeDeck({ id }) {
  return (dispatch, getState) => {
    const deck = getState().decks[id];

    const action = dispatch({
      type: REMOVE_DECK,
      deck,
    });

    return save(getState());
  }
}


export function addCard({ deckId, question, answer }) {
  return (dispatch, getState) => {
    const card = {
      id: generateId(),
      question,
      answer,
    };

    dispatch({
      type: ADD_CARD,
      deckId,
      card,
    });

    return save(getState());
  }
}
