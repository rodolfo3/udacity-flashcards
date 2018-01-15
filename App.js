import React from 'react';
import { View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo';

import DeckList from './components/DeckList';
import EditDeck from './components/EditDeck';
import DeckDetails from './components/DeckDetails';
import Question from './components/Question';
import EditQuestion from './components/EditQuestion';


const AppStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


const DeckNavigation = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
  AddDeck: {
    screen: EditDeck,
    navigationOptions: {
      tabBarLabel: 'Add deck',
    },
  },
});

const MainNavigation = StackNavigator({
  Home: {
    screen: DeckNavigation,
    navigationOptions: {
      header: null,
    }
  },
  DeckDetail: {
    screen: DeckDetails,
  },
  AddQuestion: {
    screen: EditQuestion,
  },
  Quiz: {
    screen: Question,
  },
})


export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppStatusBar backgroundColor="white" />
        <MainNavigation />
      </View>
    );
  }
}
