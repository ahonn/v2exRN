import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Navigator
} from 'react-native';
import HomePage from './pages/HomePage';
import Tabbar from './components/Tabbar';


class App extends Component {
  constructor(props) {
    super(props);
    this._renderScene = this._renderScene.bind(this);
    this._configureScene = this._configureScene.bind(this);
  }

  _configureScene(route) {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  _renderScene(route, navigator) {
    const Component = route.component;
    return <Component {...route.params} navigator={navigator} />
  }

  render() {
    const initialRoute = {
      component: Tabbar
    };
    return (
      <Navigator
        initialRoute={initialRoute}
        configureScene={this._configureScene}
        renderScene={this._renderScene}
      />
    );
  }
}

export default App;
