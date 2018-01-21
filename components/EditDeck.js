import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation'

import { connect } from 'react-redux'

import { addDeck } from '../actions';


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


const EditDeck = ({ changeTitle, save, validationMessage }) => (
    <KeyboardAvoidingView behavior="padding" style={style.wrapper}>
      <Text style={style.description}>
        What is the title of your new deck?
      </Text>
      <View style={[style._margin, style.inputWrapper]}>
        <TextInput
          style={[style._margin, style.input]}
          placeholder="Deck Title"
          onChangeText={changeTitle}
        />
      </View>
      <TouchableHighlight onPress={save}>
        <Text style={style.saveButtonText}>Submit</Text>
      </TouchableHighlight>
      <View>
        <Text style={style.validationMessage}>{ validationMessage }</Text>
      </View>
    </KeyboardAvoidingView>
);


class EditDeckContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Add Deck`,
  });

  state = {
    title: "",
    saving: false,
    validationMessage: null,
  }

  back = () => {
    return this.props.navigation.dispatch(NavigationActions.back())
  }

  save = () => {
    const { title } = this.state;

    if (!title || title.trim() === '') {
      this.setState({ validationMessage: 'Title is required!' });
      return;
    }

    this.setState({ saving: true });
    const act = this.props.dispatch(addDeck({ title }))
    act.then(() => {
      this.back();
      this.setState({
        saving: false,
        title: "",
      });
    });
  }

  updateData = (data) => {
    this.setState({ ...data, validationMessage: null });
  };

  render() {
    if (this.state.saving) {
      return <Text>Saving...</Text>;
    }

    return (
      <EditDeck
        changeTitle={title => this.updateData({ title })}
        save={this.save}
        validationMessage={this.state.validationMessage}
      />
    );
  }
}


export default connect(() => ({}))(EditDeckContainer);
