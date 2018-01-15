import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import decks from '../reducer/decks';


const store = createStore(
  combineReducers({
    decks,
  }),
  compose(applyMiddleware(thunk))
);


export default store;
