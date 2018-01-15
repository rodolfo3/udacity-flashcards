export const RECEIVE_DECKS = 'RECEIVE_DECK';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';


const mock = {
  'id42': {
    id: 'id42',
    title: 'React',
    questions: [
      {
        id: 'id314',
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        id: 'id1592',
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  'id43': {
    id: 'id43',
    title: 'React',
    questions: [
      {
        id: 'id314',
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        id: 'id1592',
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
};


function generateId() {
  return String(parseInt(Math.random() * 10e15));
}


export function loadDecks() {
  return (dispatch, getState) => {
    return dispatch({
      type: RECEIVE_DECKS,
      decks: getState().decks || mock,
    });
  }
}


export function addDeck({ title }) {
  return (dispatch) => {
    const deck = {
      id: generateId(),
      title,
      questions: [],
    };
    // TODO use a better middleware for it
    return Promise.resolve(
      dispatch({
        type: ADD_DECK,
        deck,
      })
    );
  }
}


export function addCard({ deckId, question, answer }) {
  return (dispatch) => {
    const card = {
      id: generateId(),
      question,
      answer,
    };

    return Promise.resolve(
      dispatch({
        type: ADD_CARD,
        deckId,
        card,
      })
    );
  }
}
