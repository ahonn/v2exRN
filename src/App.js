import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Navigator,
  StatusBar,
  BackAndroid
} from 'react-native';
import HomePage from './pages/HomePage';
import Tabbar from './components/Tabbar';
import theme from './config/theme';

class App extends Component {
  constructor(props) {
    super(props);

    this._onAndroidBack = this._onAndroidBack.bind(this);
    this._renderScene = this._renderScene.bind(this);
    this._configureScene = this._configureScene.bind(this);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._onAndroidBack);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._onAndroidBack);
  }

  _onAndroidBack() {
    if (this.navigator.getCurrentRoutes().length > 1) {
      this.navigator.pop();
      return true;
    }
    return false;
  }

  _configureScene(route) {
    return Navigator.SceneConfigs.HorizontalSwipeJump;
  }

  _renderScene(route, navigator) {
    this.navigator = navigator;
    const Component = route.component;
    return <Component {...route.params} navigator={navigator} />
  }

  render() {
    const initialRoute = {
      component: Tabbar
    };
    return (
      <View style={{ flex: 1}}>
        <StatusBar backgroundColor={theme.color.theme} />
        <Navigator
          initialRoute={initialRoute}
          configureScene={this._configureScene}
          renderScene={this._renderScene}
        />
      </View>
    );
  }
}

export default App;
