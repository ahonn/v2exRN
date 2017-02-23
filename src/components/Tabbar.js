import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import Theme from '../config/theme';

import HomePage from '../pages/HomePage';
import NodesPage from '../pages/NodesPage';
import NotifyPage from '../pages/NotifyPage';
import UserPage from '../pages/UserPage';

const perfix = Platform.OS === 'ios' ? 'ios' : 'md';
const tabs = [
  { name: 'home', icon: `${perfix}-home`, component: HomePage },
  { name: 'nodes', icon: `${perfix}-compass`, component: NodesPage },
  { name: 'notify', icon: `${perfix}-notifications`, component: NotifyPage },
  { name: 'user', icon: `${perfix}-person`, component: UserPage }
];

class Tabbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'home'
    };
  }

  _onPressTab(tab) {
    this.setState({
      selected: tab.name
    });
  }

  _takeIcon(iconName, isSelect = false) {
    const iconStyle = Theme.tabbar.icon;
    const iconSize = iconStyle.size;
    const iconColor = isSelect ? iconStyle.selectedColor : iconStyle.normalColor;
    return <Icon name={iconName} size={iconSize} color={iconColor} />;
  }

  render() {
    const iconColor = Theme.tabbar;
    const iconSize = 30;
    return (
      <TabNavigator
        tabBarStyle={styles.tabbar}
      >
        {tabs.map(tab => {
          return (
            <TabNavigator.Item 
              key={tab.name}
              tabStyle={styles.tab}
              selected={this.state.selected === tab.name}
              renderIcon={() => this._takeIcon(tab.icon)}
              renderSelectedIcon={() => this._takeIcon(tab.icon, true)}
              onPress={() => this._onPressTab(tab)}
            >
              {<tab.component navigator={this.props.navigator}/>}
            </TabNavigator.Item>
          );
        })}
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  tabbar: {
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  tab: {
    paddingBottom: 0
  }
});

export default Tabbar;
