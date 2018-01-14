import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';

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


const Deck = ({ deck, onPress }) => (
  <TouchableHighlight style={style.card} onPress={onPress}>
    <View>
      <Text style={style.title}>{ deck.title }</Text>
      <Text style={style.counter}>{ deck.questions.length } questions</Text>
    </View>
  </TouchableHighlight>
);


const DeckList = ({ decks, reload, goToDeck }) => (
  <ScrollView style={style.list}>
    <TouchableHighlight onPress={reload}>
      <Text>
        Reload
      </Text>
    </TouchableHighlight>
    {
      decks.map(
        deck => <Deck key={deck.id} deck={deck} onPress={() => goToDeck(deck)} />
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

  goToDeck = (deck) => {
    return this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'DeckDetail',
        params: {
          deck: {
            id: deck.id,
            title: deck.title,
          }
        },
      })
    )
  }

  render() {
    if (this.state.decks) {
      return <DeckList decks={Object.values(this.state.decks)} reload={this.reload} goToDeck={this.goToDeck} />
    } else {
      return (
        <Text>Loading...</Text>
      );
    }
  }
}

export default DeckListContainer;
