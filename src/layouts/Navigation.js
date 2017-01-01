import React, { Component } from 'react';
import { Navigator, Text } from 'react-native';
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
    return <Component {...route.params} navigator={navigator} />
	}

  configureScene(route) {
		if (route.sceneConfig) {
			return route.sceneConfig
		}
		return Navigator.SceneConfigs.FadeAndroid
	}

  render() {
    return (
      <Navigator
        ref = {view => this.navigator = view}
        initialRoute = {initialRoute}
        renderScene = {this.renderScene.bind(this)}
      />
    );
  }
}