import React, { Component } from 'react';
import {
  View, 
  StatusBar, 
  Navigator, 
  StyleSheet,
  Platform,
  BackAndroid
} from 'react-native';
import Router from '../router/Router';
import connectComponent from '../utils/connectComponent';
import * as HomeComponent from './Home';

const Home = connectComponent(HomeComponent);
const initialRoute = {
  name: 'home',
  component: Home,
};

export default class Navigation extends Component {
  renderScene(route, navigator) {
		let Component = route.component;
    this.router = this.router || new Router(navigator);
    return (
      <Component 
        {...route.params}
        router={this.router}
        route={route} />
    );
	}

  configureScene(route) {
		if (route.sceneConfig) {
			return route.sceneConfig;
		}
		return Navigator.SceneConfigs.FadeAndroid;
	}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#334"
          barStyle="light-content"
        />
        <Navigator
          initialRoute = {initialRoute}
          configureScene={this.configureScene.bind(this)}
          renderScene = {this.renderScene.bind(this)}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});