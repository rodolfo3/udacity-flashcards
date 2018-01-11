
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
  }
};


export function getDecks() {
  return new Promise(function(resolve) {
    setTimeout(() => resolve(mock), 1500);
  })
}


export function getDeck(id) {
  if (mock[id]) {
    return new Promise(function(resolve) {
        setTimeout(() => resolve(mock[id]), 1500);
    })
  } else {
    return Promise.reject();
  }
}


export function saveDeck({ title }) {
  const deck = {
    id: String(Math.random()),
    title,
    questions: []
  }
  mock[deck.id] = deck;
  return deck;
}


export function addCardToDeck(deckId, { question, answer }) {
  const deck = getDeck(deckId);
  if (!deck) throw new Error('Deck not found');

  const card = {
    id: String(Math.random()),
    question,
    answer,
  }
  deck.questions.append(card);
  return card;
}
