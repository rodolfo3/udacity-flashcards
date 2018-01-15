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


const EditDeck = ({ changeTitle, save }) => (
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
        <TouchableHighlight style={style.saveButton} onPress={save}>
          <Text style={style.saveButtonText}>Submit</Text>
        </TouchableHighlight>
    </KeyboardAvoidingView>
);


class EditDeckContainer extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Add Deck`,
  });

  state = {
    title: "",
    saving: false,
  }

  back = () => {
    return this.props.navigation.dispatch(NavigationActions.back())
  }

  save = () => {
    this.setState({ saving: true });
    const act = this.props.dispatch(addDeck({ title: this.state.title }))
    act.then(() => {
      this.back();
      this.setState({
        saving: false,
        title: "",
      });
    });
  }

  render() {
    if (this.state.saving) {
      return <Text>Saving...</Text>;
    }

    return (
      <EditDeck
        changeTitle={title => this.setState({ title })}
        save={this.save}
      />
    );
  }
}


export default connect(() => ({}))(EditDeckContainer);
