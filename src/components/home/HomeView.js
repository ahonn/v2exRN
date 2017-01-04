import React, { Component } from 'react';
import { 
  Text, 
  View,
  ToolbarAndroid, 
  DrawerLayoutAndroid,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import defaultTabs from '../../constants/Tabs';
import TopicList from '../topics/TopicList';
import SimpleTabBar from './SimpleTabBar';

const toolBarConfig = {
  title: '浏览'
};

class HomeView extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  _renderTopicList() {
    return defaultTabs.map(item => {
      return (
        <TopicList
          key={item.tab}
          tab={item.tab}
          tabLabel={item.name}
          navigator={this.props.navigator}
        />
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          title={toolBarConfig.title}
          titleColor="#fff"
          style={styles.toolbar}
          navIconName="md-menu"
          onIconClicked={() => this.props.openDrawer()} />
          <ScrollableTabView 
            renderTabBar={() => <SimpleTabBar />}
            tabBarBackgroundColor="#334"
            tabBarActiveTextColor="#FFF"
            tabBarInactiveTextColor="#EEE"
            tabBarUnderlineStyle={styles.tabbar}
          >
            { this._renderTopicList() }
          </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#334',
  },
  tabbar: {
    backgroundColor: '#FFF',
  }
});

const mapStateToProps = (state) => {
  return {
    topic: state.topic,
  };
};

export default connect(mapStateToProps)(HomeView);