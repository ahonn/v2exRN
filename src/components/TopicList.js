import React, { Component } from 'react';
import {
  View,
  Text,
  InteractionManager,
  ListView,
  RefreshControl
} from 'react-native';
import TopicLsitRow from './TopicListRow';
import ListFooter from './ListFooter';
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

    this._renderTopicRow = this._renderTopicRow.bind(this);
    this._renderFooter = this._renderFooter.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this._fetchTopics();
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.topics !== this.state.topics;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollTop) {
      this.listView.scrollTo({ y: 0 });
    }
  }

  _fetchTopics() {
    const { fetchTopics } = this.props;
    fetchTopics().then(topics => {
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
        onPressTopic={this.props.jumpTopic}
      />
    );
  }

  _renderFooter() {
    if (!this.state.isRefreshing) {
      return <ListFooter />;
    }
  }

  render() {
    return (
      <ListView
        dataSource={this.state.ds}
        renderRow={this._renderTopicRow}
        renderFooter={this._renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
          />
        }
        ref={ref => this.listView = ref}
      />
    );
  }
}

export default TopicList;
