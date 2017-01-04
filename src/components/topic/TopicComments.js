import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import TopicCommentItem from './TopicCommentItem';

class TopicComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: props.replies,
      isLoading: true,
    };
  }

  componentDidMount() {
    this._handleLoading(this.state.replies);
  }

  componentWillReceiveProps(nextProps) {
		if (nextProps.replies !== this.props.replies) {
			this._updateReplies(nextProps.replies);
      this._handleLoading(nextProps.replies);
		}
	}

 _handleLoading(replies) {
    if (replies.length) {
      this.setState({
        isLoading: false,
      });
    }
 }

  _updateReplies(data) {
    this.setState({
      replies: data,
    });
  }

  _renderButton() {
    const { repliesNum } = this.props;
    const buttonText = repliesNum > 0 ? '查看评论' : '暂无评论';

    return (
      <View style={styles.commentWrapper}>
        <Text 
          style={styles.viewComment}
          onPress={this.props.showComments}
        > 
          {buttonText}
        </Text>
      </View>
    );
  }

  _renderComments() {
    const { replies, isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.replies}>
          {replies.map((reply, idx) => {
            return (
              <TopicCommentItem 
                key={reply.id}
                idx={idx}
                reply={reply}
              />
            );
          })}
        </View>
      );
    }
  }

  render() {
    if (this.props.isShow) {
      return this._renderComments();
    } else {
      return this._renderButton();
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  replies: {
    marginTop: 15,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
		borderTopWidth: 1,
    backgroundColor: '#f2f2f2',
  },
  commentWrapper: {
    marginTop: 15,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#f2f2f2',
  },
  viewComment: {
    textAlign: 'center',
  }
});

export default TopicComments;