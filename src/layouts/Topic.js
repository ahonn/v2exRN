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
  Image
} from 'react-native';
import Comments from '../components/Comments';
import Icon from 'react-native-vector-icons/Ionicons';
import HtmlRender from 'react-native-html-render';
import { parseImgUrl } from '../utils';
import moment from 'moment';

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
    }
  }

  componentDidMount() {
    const { replies, topic } = this.state; 
    const { actions } = this.props;
    if (replies.length <= 0) {
      actions.updateTopicRepliesById(topic.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.state.topic;

    if (nextProps.topic !== this.props.topic) {
      nextProps.topic.then(topic => {
        this.setState({
          topic: topic[0],
        })
      });
    }

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

    actions.updateTopicById(id);
    actions.updateTopicRepliesById(id);
  }

  _onIconClicked() {
    this.props.router.pop();
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

  _renderContent(topic) {
    const avatar = parseImgUrl(topic.member.avatar_normal);
    const date = moment.unix(topic.created).fromNow();

    return (
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>
              {topic.title}
            </Text>
          </View>
          <View style={styles.info}>
            <TouchableOpacity>
              <Image
                style={[styles.avatar]}
                source={{uri: avatar}}>
              </Image>
            </TouchableOpacity>
            <View style={styles.author}>
              <Text style={styles.username}>
                {topic.member.username}
              </Text>
              <Text style={styles.date}>
                {date}
              </Text>
            </View>
            <View style={styles.replyNum}>
              <Text>{topic.replies}</Text>
            </View>
          </View>
        </View>

        {this._renderTopicHtml(topic)}
      </ScrollView>
    );
  }

  _renderTopicHtml(topic) {
    const content = topic.content_rendered
    const html = `<p>${content}</p>`;

    return (
      <View style={styles.topicContent}>
        <HtmlRender
          value={html}
          stylesheet={htmlStyles}
          onLinkPress={url => Linking.openURL(url)} />
      </View>
    );
  }

  render() {
    const { topic } = this.state

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

        {this._renderContent(topic)}
        <Comments 
          data={this.state.replies} />
      </View>      
    );
  }
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
  content: {
    padding: 10,
  },
  header: {
    marginBottom: 5,
  },
  titleWrapper: {
    padding: 10,
    backgroundColor: '#e2e2e2',
    borderRadius: 5,
  },
  title: {
    color: '#0a0a0a',
    fontSize: 16
  },
  info: {
    paddingTop: 10,
    flexDirection: "row",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: '500',
  },
  date: {
    fontSize: 13
  },
  replyNum: {
    position: "absolute",
    right: 5,
    bottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e2e2e2',
    borderRadius: 10,
  },
  topicContent: {
    padding: 5,
  }
});

var htmlStyles = StyleSheet.create({
  pwrapper: {
    marginTop: 5,
    marginBottom: 5
  },
  p: {
    fontSize: 14,
  }
});

export const LayoutComponent = Topic;
export function mapStateToProps(state, props) {
  const { id } = props.route.topic;
  const { replies } = state.topic;
  const topic = state.topic.topics[id];
  return {
    topic: topic || props.route.topic,
    replies: replies[id]
  }
}
