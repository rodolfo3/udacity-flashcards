import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { getDeck } from '../utils/db';


const Ended = ({ incorrect, correct, continue_ }) => (
  <View>
    <Text>That's it</Text>
    <Text>Correct: { correct }/{ incorrect + correct }</Text>
    <TouchableHighlight onPress={continue_}>
      <Text>
        {"\n"}
        Continue
        {"\n\n"}
      </Text>
    </TouchableHighlight>
  </View>
);


const Question = ({ question, seeAnswer, setCorrect, setIncorrect }) => (
  <View>
    <Text>{ question.question }</Text>
    <TouchableHighlight onPress={seeAnswer} style={{borderWidth: 1}}>
      <Text>
        {"\n"}
        Answer
        {"\n\n"}
      </Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={setCorrect} style={{borderWidth: 1}}>
      <Text>
        {"\n"}
        Correct
        {"\n\n"}
      </Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={setIncorrect} style={{borderWidth: 1}}>
      <Text>
        {"\n"}
        Incorrect
        {"\n\n"}
      </Text>
    </TouchableHighlight>
  </View>
);


const shuffle = (arr) => [...arr]; // TODO


class QuestionContainer extends Component {
  state = {
    deck: null,
    questions: null,
    questionIndex: 0,

    correctCounter: 0,
    incorrectCounter: 0,
  }

  getId = () => this.props.navigation.state.params.deck.id;

  next = () => {
    this.setState(state => ({ questionIndex: state.questionIndex + 1 }));
  }

  setCorrect = () => {
    this.setState(state => ({ correctCounter: state.correctCounter + 1 }), this.next);
  }

  setIncorrect = () => {
    this.setState(state => ({ incorrectCounter: state.incorrectCounter + 1 }), this.next);
  }

  seeAnswer = () => {
  }

  goHome = () => {
    return this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'Home',
      })
    )
  }

  componentDidMount() {
    getDeck(this.getId())
      .then(deck => this.setState({
        deck,
        questions: shuffle(deck.questions),
        questionIndex: 0,
      }))
      .catch(err => console.error(err));
  }

  render() {
    const { deck, questions, questionIndex } = this.state;
    if (!deck || deck.id != this.getId()) {
      return <Text>Loading...</Text>;
    }

    const question = questions[questionIndex];
    if (!question) {
      return (
        <Ended
          incorrect={this.state.incorrectCounter}
          correct={this.state.correctCounter}
          continue_={this.goHome}
        />
      );
    }

    return (
      <Question
        question={question}
        seeAnswer={this.seeAnswer}
        setCorrect={this.setCorrect}
        setIncorrect={this.setIncorrect}
      />
    );
  }
}


export default QuestionContainer;
