import React, { Component } from 'react';
import { 
  Text, 
  View,
  ToolbarAndroid, 
  DrawerLayoutAndroid,
  StyleSheet
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';
import defaultTabs from '../constants/Tabs';
import SimpleTabBar from '../components/SimpleTabBar';
import * as TopicListComponent from './TopicList';
import connectComponent from '../utils/connectComponent';

const TopicList = connectComponent(TopicListComponent);

const toolBarConfig = {
  title: '浏览'
};

class Home extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  _renderTopicList() {
    const { router } = this.props;

    return defaultTabs.map(item => {
      return (
        <TopicList
          key={item.tab}
          tab={item.tab}
          tabLabel={item.name}
          router={router}
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

export const LayoutComponent = Home;
export function mapStateToProps(state) {
  return {
    topic: state.topic,
  };
}

var styles = StyleSheet.create({
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