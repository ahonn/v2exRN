import React, { Component } from 'react';
import {
  View, 
  StatusBar, 
  Navigator, 
  StyleSheet,
  Platform,
  BackAndroid,
  DrawerLayoutAndroid
} from 'react-native';
import Router from '../router/Router';
import connectComponent from '../utils/connectComponent';
import * as HomeComponent from './Home';
import Navigation from '../components/Navigation';

const Home = connectComponent(HomeComponent);
const initialRoute = {
  name: 'home',
  component: Home,
};

export default class Container extends Component {
  _openDrawer() {
    this.drawer.openDrawer();
  }
  
  _closeDrawer() {
    this.drawer.closeDrawer();
  }

  _renderNavigation() {
    return (
      <Navigation 
        router={this.router}
        closeDrawer={this._closeDrawer.bind(this)}
      />
    );
  }

  _renderScene(route, navigator) {
		let Component = route.component;
    this.router = this.router || new Router(navigator);
    return (
      <Component 
        {...route.params}
        router={this.router}
        route={route}
        openDrawer={this._openDrawer.bind(this)} />
    );
	}

  _configureScene(route) {
		if (route.sceneConfig) {
			return route.sceneConfig;
		}
		return Navigator.SceneConfigs.FadeAndroid;
	}

  render() {
    return (
      <View style={styles.container}>
        <DrawerLayoutAndroid
          ref={view => this.drawer = view}
          drawerWidth={250}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={this._renderNavigation.bind(this)}>
          <StatusBar
            backgroundColor="#334"
            barStyle="light-content"
          />
          <Navigator
            initialRoute = {initialRoute}
            configureScene={this._configureScene.bind(this)}
            renderScene = {this._renderScene.bind(this)}
          />
        </DrawerLayoutAndroid>
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