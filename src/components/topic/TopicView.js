import React, { Component } from 'react';
import {
  View,
  Text,
  ToolbarAndroid,
  ScrollView,
  StyleSheet,
  Share,
  Linking,
  TouchableOpacity,
  Image,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import TopicTitle from './TopicTitle';
import TopicInfo from './TopicInfo';
import TopicContent from './TopicContent';
import TopicComments from './TopicComments';
import actions from '../../actions';

const toolbarConfig = {
  actions: [
    { title: '刷新', iconName: 'md-refresh', show: 'always' },
    { title: '分享' },
    { title: '用浏览器打开' }
  ]
};

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: props.topic,
      replies: [],
      isRefreshing: false,
      isShowComments: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.replies !== this.props.replies) {
      nextProps.replies.then(replies => {
        this.setState({
          replies: replies,
        });
      });
		}
	}

  _onRefresh() {
    const { id } = this.state.topic;
    const { actions } = this.props;

    this.setState({ isRefreshing: true });
    setTimeout(() => {
      actions.updateTopicRepliesById(id);
      this.setState({ isRefreshing: false });
    }, 1000);
  }

  _onIconClicked() {
    this.props.navigator.pop();
  }

  _onActionSelected(i) {
    const { title, url } = this.state.topic;

    switch(i) {
      case 0:
        this._onRefresh();
        break;
      case 1:
        Share.share({
          url: url,
          title: title,
          message: `${title} ${url}`,
        });
        break;
      case 2:
        Linking.openURL(url);
        break;
    }
  }

  _showComments() {
    const { id, replies } = this.state.topic;
    const { actions } = this.props;

    if (replies > 0) {
      this.setState({
        isShowComments: true
      });
      actions.updateTopicRepliesById(id);
      }
  }

  render() {
    const { topic, replies, isRefreshing, isShowComments } = this.state;

    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid 
          titleColor='#fff'
          style={styles.toolbar}
          actions={toolbarConfig.actions}
          navIconName="md-arrow-back"
          overflowIconName="md-more"
          onIconClicked={this._onIconClicked.bind(this)}
          onActionSelected={this._onActionSelected.bind(this)} />

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing} 
                onRefresh={this._onRefresh.bind(this)} />
            }>
            <View style={styles.content} >
              <View style={styles.header}>
                <TopicTitle topic={topic} />
                <TopicInfo topic={topic} />
              </View>
              <TopicContent topic={topic} />
              <TopicComments
                replies={replies}
                repliesNum={topic.replies}
                isShow={isShowComments}
                showComments={this._showComments.bind(this)}
              />
            </View>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#334',
  },
  header: {
    padding: 10,
    marginBottom: 5,
  },
});

const mapStateToProps = (state, props) => {
  const { id } = props.topic;
  const { replies } = state.topic;
  return {
    topic: props.topic,
    replies: replies[id]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topic);