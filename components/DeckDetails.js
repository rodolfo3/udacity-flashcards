import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';

import { removeDeck } from '../actions';


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
  secondaryActions: {
    alignSelf: "flex-end",
  },
  secondaryButton: {
    ...btn,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "black",
  },
  warningButton: {
    ...btn,
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "white",
  },
  buttonText: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,

    color: "black",
  }
});


const DeckDetails = ({ deck, addCard, deleteDeck, startQuiz }) => (
  <View style={style.wrapper}>
    <View style={[style.wrapper, {minWidth: 175}]}>
      <Text>{ deck.questions.length } questions</Text>
      <TouchableHighlight onPress={startQuiz} style={style.button}>
        <Text style={style.buttonText}>Start Quiz</Text>
      </TouchableHighlight>
    </View>
    <View style={style.secondaryActions}>
      <TouchableHighlight onPress={deleteDeck} style={style.warningButton}>
        <Text style={style.buttonText}>Delete Deck!</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={addCard} style={style.secondaryButton}>
        <Text style={style.buttonText}>Add Card</Text>
      </TouchableHighlight>
    </View>
  </View>
);


class DeckDetailsContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Deck ${navigation.state.params.deck.title}`,
  });

  back = () => {
    return this.props.navigation.dispatch(NavigationActions.back())
  }

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

  _deleteDeck = () => {
    const { deck } = this.props;
    const act = this.props.dispatch(removeDeck({ id: deck.id }))
    return act.then(() => this.back());
  }

  deleteDeck = () => {
    const { deck } = this.props;
    Alert.alert(
      'Are you sure?',
      `This will remove ${deck.title} forever...`,
      [
        {text: 'Yes, delete it', onPress: () => this._deleteDeck()},
        {text: 'No, keep it', style: 'cancel'},
      ],
      { cancelable: true }
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
      return <DeckDetails deck={deck} addCard={this.addCard} deleteDeck={this.deleteDeck} startQuiz={this.startQuiz} />;
    }
    return <Text>Loading...</Text>;
  }
}


function mapStateToProps(state, props) {
  const deckId = props.navigation.state.params.deck.id;
  return {
    deck: state.decks[deckId],
  }
}


export default connect(mapStateToProps)(DeckDetailsContainer);
