import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';

import { getDeck } from '../utils/db';


const btn = {
  borderRadius: 4,
  margin: 20,
}


const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    ...btn,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
  },
  secondaryButton: {
    ...btn,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "flex-end",
  },
  buttonText: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,

    color: "black",
  }
});


const DeckDetails = ({ deck, addCard, startQuiz }) => (
  <View style={style.wrapper}>
    <View style={[style.wrapper, {minWidth: 175}]}>
      <Text>{ deck.questions.length } questions</Text>
      <TouchableHighlight onPress={startQuiz} style={style.button}>
        <Text style={style.buttonText}>Start Quiz</Text>
      </TouchableHighlight>
    </View>
    <TouchableHighlight onPress={addCard} style={style.secondaryButton}>
      <Text style={style.buttonText}>Add Card</Text>
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
