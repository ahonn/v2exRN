import React, { Component } from 'react';
import {
  View,
  Image,
  Navigator, 
  StyleSheet,
  BackAndroid,
  DrawerLayoutAndroid,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';
import MenuItem from './MenuItem';
import HomeView from './home/HomeView';
import NodesView from './nodes/NodesView';
import config from '../config';

const menu = [
  { title: '浏览', name: 'home', icon: 'md-compass', type: 'component'},
  { title: '节点', name: 'nodes', icon: 'md-cube', type: 'component' },
  { title: '反馈', name: 'feedback', icon: 'md-mail', type: 'link', link: config.feedback },
  { title: '关于', name: 'about', icon: 'md-information-circle', type: 'link' , link: config.about }
];

class MenuView extends Component {
  _openDrawer() {
    this.drawer.openDrawer();
  }
  
  _onMenuSelect(item) {
    switch (item.type) {
      case 'link':
        Linking.openURL(item.link);
        break;
      case 'component':
        if (this.props.tab !== item.name) {
          this.props.actions.switchTab(item.name);
        }
        break;
      default:
    }
    this.drawer.closeDrawer();
  }

  _renderNavigation() {
    return (
      <View style={styles.drawer}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={{ uri: 'navigation' }}
          />
        </View>
        {menu.map(item => {
          return (
            <MenuItem 
              key={item.name}
              icon={item.icon}
              title={item.title}
              selected={this.props.tab === item.name}
              onPress={this._onMenuSelect.bind(this, item)}
            />
          );
        })}
      </View>
    );
  }

  _renderContent() {
    switch (this.props.tab) {
      case 'home': 
        return (
          <HomeView 
            navigator={this.props.navigator}
            openDrawer={this._openDrawer.bind(this)}
          />
        );
      case 'nodes':
        return (
          <NodesView
            navigator={this.props.navigator}
            openDrawer={this._openDrawer.bind(this)}
          />
        );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <DrawerLayoutAndroid
          ref={view => this.drawer = view}
          drawerWidth={250}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={this._renderNavigation.bind(this)}>
          <View style={styles.content}>
            {this._renderContent()}
          </View>
        </DrawerLayoutAndroid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  header: {
    height: 140,
    backgroundColor: '#334',
    marginBottom: 10,
  },
  image: {
    height: 140,
  },
});

const mapStateToProps = (state, props) => {
  return {
    tab: state.navigation.tab,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuView);