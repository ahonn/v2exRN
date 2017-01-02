import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity
} from 'react-native';
import HtmlRender from 'react-native-html-render';
import { parseImgUrl } from '../utils';
import moment from 'moment';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replies: props.replies,
    };
  }

  componentWillReceiveProps(nextProps) {
		if (nextProps.replies !== this.props.replies) {
			this._updateReplies(nextProps.replies);
		}
	}

  _updateReplies(data) {
    this.setState({
      replies: data,
    });
  }

  render() {
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
}

var styles = StyleSheet.create({
  replies: {
    marginTop: 15,
    borderTopColor: "rgba(0, 0, 0, 0.05)",
		borderTopWidth: 1,
    backgroundColor: '#f2f2f2',
  },
  reply: {
    padding: 10,
    
    borderBottomColor: "rgba(0, 0, 0, 0.05)",
		borderBottomWidth: 1,
  },
  header: {
    flexDirection: "row",
  },
  avatar: {
    height: 25,
    width: 25,
    borderRadius: 20,
    marginRight: 10,
  },
  info: {
    flexDirection: "row",
  },
  usernameWrapper: {
    marginRight: 10,
  },
  username: {
    fontSize: 13,
  },
  dateWrapper: {
    marginRight: 10,
  },
  date: {
    fontSize: 12,
  },
  floorWrapper: {
    position: "absolute",
    right: 5,
  },
  floor: {
    fontSize: 11,
  },
  content: {
    marginLeft: 20,
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
    fontSize: 12,
  },
  a: {
    color: '#4078c0',
    fontSize: 12,
  }
});