import { AsyncStorage } from 'react-native'


const DATA_KEY = 'Flashcards:data';


const EXAMPLE = {
  'mock-questions': {
    id: 'mock-questions',
    title: 'React',
    questions: [
      {
        id: '314',
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        id: '159',
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
};


export function load() {
  return AsyncStorage.getItem(DATA_KEY)
    .then(data => data ? JSON.parse(data) : { decks: EXAMPLE });
}

export function save(data) {
  return AsyncStorage.setItem(DATA_KEY, JSON.stringify(data));
}
