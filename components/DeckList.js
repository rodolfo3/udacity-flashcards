import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getDecks } from '../utils/db';


class DeckList extends Component {
  render() {
    const { decks } = this.props;
    return (
      <View>
        <Text>Deck List</Text>
        <Text>{ JSON.stringify(decks, null, '  ') }</Text>
      </View>
    );
  }
}


class DeckListContainer extends Component {
  state = {
    decks: null,
  }

  componentDidMount() {
    getDecks().then(decks => this.setState({ decks }));
  }

  render() {
    if (this.state.decks) {
      return <DeckList decks={this.state.decks} />
    } else {
      return (
        <Text>Loading...</Text>
      );
    }
  }
}

export default DeckListContainer;
