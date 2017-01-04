import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity
} from 'react-native';
import HtmlRender from 'react-native-html-render';
import { parseImgUrl } from '../../utils';
import moment from 'moment';

class TopicCommentItem extends Component {
  render() {
    const { reply, idx } = this.props;
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
  }
}

const styles = StyleSheet.create({
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

const htmlStyles = StyleSheet.create({
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

export default TopicCommentItem;