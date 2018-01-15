import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation'

import { connect } from 'react-redux'

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


const EditQuestion = ({ changeQuestion, changeAnswer, save }) => (
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
    </KeyboardAvoidingView>
);


class EditQuestionContainer extends Component {
  state = {
    question: "",
    answer: "",
    saving: false,
  }

  getId = () => this.props.navigation.state.params.deck.id;

  back = () => {
    return this.props.navigation.dispatch(NavigationActions.back())
  }

  save = () => {
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

  render() {
    if (this.state.saving) {
      return <Text>Saving...</Text>;
    }

    return (
      <EditQuestion
        changeQuestion={question => this.setState({ question })}
        changeAnswer={answer => this.setState({ answer })}
        save={this.save}
      />
    );
  }
}


function mapStateToProps(state) {
  return {
  };
}


export default connect(mapStateToProps)(EditQuestionContainer);
