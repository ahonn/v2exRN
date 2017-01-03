import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import Container from './layouts/Container';

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}
