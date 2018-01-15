
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
  'id44': {
    id: 'id44',
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
  'id45': {
    id: 'id45',
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


export function getDecks() {
  return new Promise(function(resolve) {
    setTimeout(() => resolve(mock), 150);
  })
}


export function getDeck(id) {
  if (mock[id]) {
    return Promise.resolve(mock[id]);
  } else {
    return Promise.reject();
  }
}


function generateId() {
  return String(parseInt(Math.random() * 10e15));
}


export function saveDeck({ title }) {
  const deck = {
    id: generateId(),
    title,
    questions: []
  }
  mock[deck.id] = deck;
  return Promise.resolve(deck);
}


export function addCardToDeck(deckId, { question, answer }) {
  return getDeck(deckId).then(deck => {
    if (!deck) throw new Error('Deck not found');

    const card = {
      id: String(Math.random()),
      question,
      answer,
    }
    deck.questions.push(card);
    return card;
  })
}
