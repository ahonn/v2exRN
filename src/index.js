import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import Navigation from './layouts/Navigation';

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
