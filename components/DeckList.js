import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getDecks } from '../utils/db';


const Deck = ({ deck }) => (
  <View>
    <Text>{ deck.title }</Text>
    <Text>{ deck.questions.length } questions</Text>
  </View>
);


const DeckList = ({ decks }) => (
  <View>
    <Text>Deck List</Text>
    {
      decks.map(
        deck => <Deck key={deck.id} deck={deck} />
      )
    }
  </View>
);


class DeckListContainer extends Component {
  state = {
    decks: null,
  }

  componentDidMount() {
    getDecks().then(decks => this.setState({ decks }));
  }

  render() {
    if (this.state.decks) {
      return <DeckList decks={Object.values(this.state.decks)} />
    } else {
      return (
        <Text>Loading...</Text>
      );
    }
  }
}

export default DeckListContainer;
