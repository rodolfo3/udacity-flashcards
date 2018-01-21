import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { connect } from 'react-redux';

import { addCard } from '../actions';


const style = StyleSheet.create({
  _margin: {
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    marginLeft: 10,
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 50,
  },

  inputWrapper: {
    borderWidth: 1,
    borderRadius: 4,
  },

  input: {
  },

  validationMessage: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'red',

    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
  },

  saveButtonText: {
    alignSelf: 'center',
    borderRadius: 4,

    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,

    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: 'black',
    color: 'white',
  },
});


const EditQuestion = ({ changeQuestion, changeAnswer, save, validationMessage = null }) => (
    <KeyboardAvoidingView behavior="padding" style={style.wrapper}>

      <View style={[style._margin, style.inputWrapper]}>
        <TextInput
          style={[style._margin, style.input]}
          placeholder="Question"
          onChangeText={changeQuestion}
        />
      </View>

      <View style={[style._margin, style.inputWrapper]}>
        <TextInput
          style={[style._margin, style.input]}
          placeholder="Answer"
          onChangeText={changeAnswer}
        />
      </View>

      <TouchableHighlight style={style.saveButton} onPress={save}>
        <Text style={style.saveButtonText}>Submit</Text>
      </TouchableHighlight>

      <View>
        <Text style={style.validationMessage}>{ validationMessage }</Text>
      </View>
    </KeyboardAvoidingView>
);


class EditQuestionContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `New card on "${navigation.state.params.deck.title}"`,
  });

  state = {
    question: "",
    answer: "",
    saving: false,
    validationMessage: null,
  }

  getId = () => this.props.navigation.state.params.deck.id;

  back = () => {
    return this.props.navigation.dispatch(NavigationActions.back())
  }

  save = () => {
    const { question, answer } = this.state;
    if (!question || question.trim() === '') {
      this.setState({ validationMessage: 'Question is required!' });
      return;
    }

    if (!answer || answer.trim() === '') {
      this.setState({ validationMessage: 'Answer is required!' });
      return;
    }

    this.setState({ saving: true });
    const act = this.props.dispatch(addCard({
      deckId: this.getId(),
      question: this.state.question,
      answer: this.state.answer,
    }))
    act.then(() => {
      this.back();
      this.setState({
        saving: false,
        question: "",
        answer: "",
      });
    })
  }

  updateData = (data) => {
    this.setState({ ...data, validationMessage: null });
  };

  render() {
    if (this.state.saving) {
      return <Text>Saving...</Text>;
    }

    return (
      <EditQuestion
        changeQuestion={question => this.updateData({ question })}
        changeAnswer={answer => this.updateData({ answer })}
        save={this.save}
        validationMessage={this.state.validationMessage}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
  };
}


export default connect(mapStateToProps)(EditQuestionContainer);
