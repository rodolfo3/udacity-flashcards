import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableHighlight } from 'react-native';

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
  state = {
    deck: null,
  }

  getId = () => this.props.navigation.state.params.deck.id;

  addCard = () => {
  }

  startQuiz = () => {
  }

  componentDidMount() {
    getDeck(this.getId())
      .then(deck => this.setState({ deck }))
      .catch(err => console.error(err));
  }

  render() {
    const { deck } = this.state;
    if (deck && deck.id == this.getId()) {
      return <DeckDetails deck={deck} addCard={this.addCard} startQuiz={this.startQuiz} />;
    }
    return <Text>Loading...</Text>;
  }
}


export default DeckDetailsContainer;
