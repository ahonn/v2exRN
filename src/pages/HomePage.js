import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import TopicList from '../components/TopicList';
import theme from '../config/theme';
import api from '../api';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTab: {
        name: 'V2Explorer',
        id: 'all'
      },
      scrollTop: false,
    };

    this._fetchTopics = this._fetchTopics.bind(this);
    this._onDbclickTitle = this._onDbclickTitle.bind(this);
  }

  _onDbclickTitle() {
    this.setState({ scrollTop: true });
    setTimeout(() => {
      this.setState({ scrollTop: false });
    }, 500);
  }

  _fetchTopics() {
    const { tab } = this.state.defaultTab;
    return api.fetchTopicsByTab(tab);
  }

  render() {
    const { defaultTab, scrollTop } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={defaultTab.name}
          textColor={theme.color.white}
          backgroundColor={theme.color.theme}
          onDbclickTitle={this._onDbclickTitle}
        />
        <TopicList
          scrollTop={scrollTop}
          fetchTopics={this._fetchTopics}
          navigator={this.props.navigator}
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
