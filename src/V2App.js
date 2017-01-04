import React, { Component } from 'react';
import { 
  View,
  StatusBar,
  StyleSheet
} from 'react-native';
import { Provider } from 'react-redux';
import createStore from './store/createStore';
import V2Navigator from './V2Navigator';

const store = createStore();

export default class V2App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor="#334"
            barStyle="light-content"
          />
          <V2Navigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});