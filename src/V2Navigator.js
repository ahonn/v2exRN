import React, { Component } from 'react';
import {
  View, 
  StatusBar, 
  Navigator, 
  StyleSheet,
  Platform,
  BackAndroid,
  DrawerLayoutAndroid,
  ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from './actions';
import MenuView from './components/MenuView';
import TopicView from './components/topic/TopicView';
import TopicListView from './components/topicList/TopicListView';

let backCount = 2;

class V2Navigator extends Component {
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButton.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButton.bind(this));
  }

  _handleBackButton() {
    if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
      this.navigator.pop();
      return true;
    }

    if (backCount > 1) {
      setTimeout(() => backCount = 2, 2000);
      ToastAndroid.show('再次点击退出应用', ToastAndroid.SHORT);
      backCount--;
      return true;
    }

    return false;
  }

  _renderScene(route, navigator) {
    if (route.topic) {
      return <TopicView navigator={navigator} topic={route.topic} />;
    } else if (route.node) {
      return <TopicListView navigator={navigator} node={route.node} />;
    }
    return <MenuView navigator={navigator} />;
	}

  _configureScene(route) {
		if (route.sceneConfig) {
			return route.sceneConfig;
		}
		return Navigator.SceneConfigs.FadeAndroid;
	}

  render() {
    return (
      <Navigator
        refs={view => this.navigator = view}
        initialRoute = {{}}
        configureScene={this._configureScene.bind(this)}
        renderScene = {this._renderScene.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

const mapStateToProps = (state) => {
  return {
    tab: state.navigation.tab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V2Navigator);