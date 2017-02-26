import React, { Component } from 'react';
import {
  View,
  Text,
  InteractionManager,
  ListView,
  RefreshControl
} from 'react-native';
import TopicLsitRow from './TopicListRow';
import api from '../api';

class TopicList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      topics: [],
      ds: dataSource,
      isRefreshing: true
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._fetchTopics();
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.topics !== this.state.topics;
  }

  _fetchTopics() {
    const { tab } = this.props;
    api.fetchTopicsByTab(tab).then(topics => {
      this.setState({
        topics,
        isRefreshing: false,
        ds: this.state.ds.cloneWithRows(topics)
      });
    });
  }

  _onRefresh() {
    this.setState({ isRefreshing: true });
    this._fetchTopics();
  }

  _renderTopicRow(topic) {
    return (
      <TopicLsitRow
        key={topic.id}
        topic={topic}
      />
    );
  }

  render() {
    console.log(this.state.topics);
    return (
      <ListView
        dataSource={this.state.ds}
        renderRow={this._renderTopicRow}
        refreshControl={
          <RefreshControl
            ref={view => this.refreshControl = view}
            refreshing={this.state.isRefreshing}
            onRefresh={() => this._onRefresh}
          />
        }
      />
    );
  }
}

export default TopicList;
