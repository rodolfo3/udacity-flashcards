import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';

import { getDeck } from '../utils/db';


const DeckDetails = ({ deck, addCard, startQuiz }) => (
  <View>
    <Text>{ deck.title }</Text>
    <Text>{ deck.questions.length } questions</Text>
    <TouchableHighlight onPress={addCard} style={{borderWidth: 1}}>
      <Text>{"\n\n"}Add Card{"\n\n"}</Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={startQuiz} style={{borderWidth: 1}}>
      <Text>{"\n\n"}Start Quiz{"\n\n"}</Text>
    </TouchableHighlight>
  </View>
);


class DeckDetailsContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Deck ${navigation.state.params.deck.title}`,
  });

  addCard = () => {
    const { deck } = this.props;
    return this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'AddQuestion',
        params: {
          deck: {
            id: deck.id,
            title: deck.title,
          }
        },
      })
    )
  }

  startQuiz = () => {
    const { deck } = this.props;
    return this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'Quiz',
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
    const { deck } = this.props;
    if (deck) {
      return <DeckDetails deck={deck} addCard={this.addCard} startQuiz={this.startQuiz} />;
    }
    return <Text>Loading...</Text>;
  }
}


function mapStateToProps(state, props) {
  const deckId = props.navigation.state.params.deck.id;
  return {
    ...props,
    deck: state.decks[deckId],
  }
}


export default connect(mapStateToProps)(DeckDetailsContainer);
