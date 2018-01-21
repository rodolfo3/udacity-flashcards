import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Ended from './Ended';

import { updateLocalNotification } from '../../utils/helpers';


const btn = {
  paddingTop: 10,
  paddingRight: 20,
  paddingBottom: 10,
  paddingLeft: 20,

  borderRadius: 4,

  margin: 20,
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignContent: "center",
    margin: 20,
  },
  progress: {
    color: "gray",
  },
  questionWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  question: {
    textAlign: "center",
    fontSize: 60,
  },
  seeAnswer: {
    ...btn,
    color: "red",
    textAlign: "center",
  },
  correctTouchable: {
    ...btn,
    backgroundColor: "green",
  },
  correct: {
    color: "white",
    textAlign: "center",
  },
  incorrectTouchable: {
    ...btn,
    backgroundColor: "red",
  },
  incorrect: {
    color: "white",
    textAlign: "center",
  },
});


const Question = ({ question, answer, seeAnswer, setCorrect, setIncorrect, total, currentIndex }) => (
  <View style={style.wrapper}>
    <Text style={style.progress}>{ currentIndex + 1 } / { total }</Text>
    <View style={style.questionWrapper}>
      <Text style={style.question}>
        { answer || question.question }
      </Text>
    </View>
    {
      answer
      ? (
        null
      )
      : (
        <TouchableHighlight onPress={seeAnswer} style={style.seeAnswerTouchable}>
          <Text style={style.seeAnswer}>
            Answer
          </Text>
        </TouchableHighlight>
      )
    }
    <TouchableHighlight onPress={setCorrect} style={style.correctTouchable}>
      <Text style={style.correct}>
        Correct
      </Text>
    </TouchableHighlight>
    <TouchableHighlight onPress={setIncorrect} style={style.incorrectTouchable}>
      <Text style={style.incorrect}>
        Incorrect
      </Text>
    </TouchableHighlight>
  </View>
);


class QuestionContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  state = {
    questionIndex: 0,

    correctCounter: 0,
    incorrectCounter: 0,
    answer: null,
  }

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
    const { questions, deck } = this.props;
    const { questionIndex } = this.state;
    const question = questions[questionIndex];

    this.setState({ answer: question.answer });
  }

  goHome = () => {
    updateLocalNotification();
    return this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'Home',
      })
    )
  }

  render() {
    const { questions, deck } = this.props;
    const { questionIndex } = this.state;
    if (!deck) {
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
        answer={this.state.answer}
        setCorrect={this.setCorrect}
        setIncorrect={this.setIncorrect}
        total={questions.length}
        currentIndex={questionIndex}
      />
    );
  }
}


const shuffle = (arr) => [...arr]; // TODO


function mapStateToProps(state, props) {
  const deckId = props.navigation.state.params.deck.id;
  const deck = state.decks[deckId];
  return {
    deck: deck,
    questions: deck && shuffle(deck.questions),
  }
}

export default connect(mapStateToProps)(QuestionContainer);
