import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'

import { setLocalNotification } from '../utils/helpers';
import { loadDecks } from '../actions';


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
    setLocalNotification();
  }

  reload = () => {
    this.props.dispatch(loadDecks());
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
    const { decks } = this.props;

    if (decks) {
      if (Object.keys(decks).length > 0) {
        return <DeckList decks={Object.values(decks)} reload={this.reload} goToDeck={this.goToDeck} />
      } else {
        return (
          <Text>No decks found. Add your first!</Text>
        );
      }
    } else {
      return (
        <Text>Loading...</Text>
      );
    }
  }
}


function mapStateToProps(state) {
  return {
    decks: state.decks,
  }
}


export default connect(mapStateToProps)(DeckListContainer);
