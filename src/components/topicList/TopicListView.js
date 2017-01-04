import React, { Component } from 'react';
import { 
  Text, 
  View,
  ToolbarAndroid, 
  DrawerLayoutAndroid,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import defaultTabs from '../../constants/Tabs';
import TopicList from '../topicList/TopicList';

class TopicListView extends Component {
  _onIconClicked() {
    this.props.navigator.pop();
  }

  render() {
    const { node } = this.props;

    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          title={node.title}
          titleColor="#fff"
          style={styles.toolbar}
          navIconName="md-arrow-back"
          onIconClicked={this._onIconClicked.bind(this)} />
        <TopicList
          tab={node.name}
          navigator={this.props.navigator}
        />
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

export default TopicListView;