import React from 'react';
import { Navigator, Platform, BackAndroid } from 'react-native';

export default class Router {
  constructor(navigator) {
    this.navigator = navigator;
		if (Platform.OS === 'android') {
			BackAndroid.addEventListener('hardwareBackPress', ()=> {
				const routesList = this.navigator.getCurrentRoutes();
				const currentRoute = routesList[routesList.length - 1];
				if (currentRoute.name !== 'home') {
					navigator.pop();
					return true;
				}
				return false;
			});
		}
  }

  push(props) {
    this.navigator.push(props);
  }

  pop(props) {
    this.navigator.pop();
  }
}