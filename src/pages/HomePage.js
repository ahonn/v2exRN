import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import TopicList from '../components/TopicList';
import TopicPage from './TopicPage';
import theme from '../config/theme';
import api from '../api';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTab: {
        name: '全部',
        id: 'all'
      }
    };

    this._jumpTopic = this._jumpTopic.bind(this);
  }

  _jumpTopic(topic) {
    this.props.navigator.push({
      component: TopicPage,
      name: 'topic',
      params: { topic }
    });
  }

  render() {
    const { defaultTab } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={defaultTab.name}
          textColor={theme.color.white}
          backgroundColor={theme.color.theme}
        />
        <TopicList
          tab={defaultTab.id}
          jumpTopic={this._jumpTopic}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default HomePage;
