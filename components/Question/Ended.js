import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableHighlight } from 'react-native';

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
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  message: {
    textAlign: "center",
    fontSize: 40,
  },
  grade: {
    textAlign: "center",
    fontSize: 60,
  },
  good: {
    color: "green",
  },
  bad: {
    color: "orange",
  },
  button: {
    ...btn,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    color: "black",
  }
});


const isGoodGrade = (correct, incorrect) => {
  return correct > incorrect;
};


const Ended = ({ incorrect, correct, continue_ }) => (
  <View style={style.wrapper}>
    <Text style={style.message}>That's it</Text>
    <Text
      style={[style.grade, isGoodGrade(correct, incorrect) ? style.good : style.bad ]}
    >
      { correct }/{ incorrect + correct }
    </Text>
    <TouchableHighlight onPress={continue_}>
      <Text>
        Continue
      </Text>
    </TouchableHighlight>
  </View>
);


export default Ended;
