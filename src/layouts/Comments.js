import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import HtmlRender from 'react-native-html-render';
import { parseImgUrl } from '../utils';
import moment from 'moment';

export default class Comments extends Component {
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

  _renderComments() {
    const { replies } = this.state;
    return (
      <View style={styles.replies}>
        {replies.map((reply, idx) => {
          const avatar = parseImgUrl(reply.member.avatar_normal);
          const date = moment.unix(reply.created).fromNow();
          const content = `<p>${reply.content_rendered}</p>`;
          const floor = `#${idx + 1}`;

          return (
            <View style={styles.reply} key={reply.id}>
              <View style={styles.header}>
                <TouchableOpacity>
                  <Image
                    style={[styles.avatar]}
                    source={{uri: avatar}}>
                  </Image>
                </TouchableOpacity>
                <View style={styles.info}>
                  <View style={styles.usernameWrapper}>
                    <Text style={styles.username}>
                      {reply.member.username}
                    </Text>
                  </View>
                  <View style={styles.dateWrapper}>
                    <Text style={styles.date}>
                      {date}
                    </Text>
                  </View>
                </View>
                <View style={styles.floorWrapper}>
                  <Text style={styles.floor}>
                    {floor}
                  </Text>
                </View>
              </View>
              <View style={styles.content}>
                <HtmlRender 
                  value={content}
                  stylesheet={htmlStyles}
                  onLinkPress={url => Linking.openURL(url)}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return this._renderComments();
    }
  }
}

var styles = StyleSheet.create({
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
  reply: {
    padding: 10,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
		borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  info: {
    flexDirection: 'row',
  },
  usernameWrapper: {
    marginRight: 10,
  },
  username: {
    fontSize: 14,
  },
  dateWrapper: {
    marginRight: 10,
  },
  date: {
    fontSize: 14,
  },
  floorWrapper: {
    position: 'absolute',
    right: 5,
  },
  floor: {
    fontSize: 12,
  },
  content: {
    marginLeft: 25,
  }
});


var htmlStyles = StyleSheet.create({
  pwrapper: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  p: {
    fontSize: 14,
  },
  a: {
    color: '#4078c0',
    fontSize: 14,
  }
});