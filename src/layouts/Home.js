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
    defaultTabs.forEach(item => {
      this._getTopics(item.tab);
    });
  }

  _getTopics(tab) {
    const { actions, topic } = this.props;
    if (!topic[tab] || !topic[tab].length) {
      actions.getTopicsByTab(tab);
    }
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
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
      </View>
    );

    return (
      <DrawerLayoutAndroid
        ref={view => this.drawer = view}
        drawerWidth={250}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
        <View style={styles.container}>
          <Icon.ToolbarAndroid
            title={toolBarConfig.title}
            titleColor="#fff"
            style={styles.toolbar}
            navIconName="md-menu"
            onIconClicked={() => this.drawer.openDrawer()} />
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
      </DrawerLayoutAndroid>
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