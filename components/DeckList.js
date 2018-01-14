import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';

import { getDecks } from '../utils/db';


const style = StyleSheet.create({
  card: {
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'darkgray',
  },
  counter: {
    textAlign: 'center',
    color: 'gray',
  },
  list: {
  },
});


const Deck = ({ deck }) => (
  <TouchableHighlight style={style.card} onPress={() => console.log("Deck!")}>
    <View>
      <Text style={style.title}>{ deck.title }</Text>
      <Text style={style.counter}>{ deck.questions.length } questions</Text>
    </View>
  </TouchableHighlight>
);


const DeckList = ({ decks, reload }) => (
  <ScrollView style={style.list}>
    <TouchableHighlight onPress={reload}>
      <Text>
        Reload
      </Text>
    </TouchableHighlight>
    {
      decks.map(
        deck => <Deck key={deck.id} deck={deck} />
      )
    }
  </ScrollView>
);


class DeckListContainer extends Component {
  state = {
    decks: null,
  }

  componentDidMount() {
    this.reload();
  }

  reload = () => {
    getDecks().then(decks => this.setState({ decks }));
  }

  render() {
    if (this.state.decks) {
      return <DeckList decks={Object.values(this.state.decks)} reload={this.reload} />
    } else {
      return (
        <Text>Loading...</Text>
      );
    }
  }
}

export default DeckListContainer;
