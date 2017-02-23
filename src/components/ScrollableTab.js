import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import theme from '../config/theme';

class ScrollableTab extends Component {

  render() {
    const backgroundColor = theme.color.theme;
    const activeTextColor = theme.color.white;
    const inactiveTextColor = theme.color.lightGrey;
    return (
      <ScrollableTabView
        tabBarBackgroundColor={backgroundColor}
        tabBarActiveTextColor={activeTextColor}
        tabBarInactiveTextColor={inactiveTextColor}
        tabBarUnderlineStyle={{ backgroundColor: activeTextColor}}
        renderTabbar={() => <ScrollableTabBar />}
      >
        {this.props.children}
      </ScrollableTabView>
    );
  }
}

export default ScrollableTab;
