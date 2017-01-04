import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl
} from 'react-native';
import { parseImgUrl } from '../../utils';
import moment from 'moment';

class TopicInfo extends Component {
  render() {
    const { topic } = this.props; 
    const avatar = parseImgUrl(topic.member.avatar_normal);
    const date = moment.unix(topic.created).fromNow();

    return (      
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
    );
  }
}

const styles = StyleSheet.create({
  info: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 15,
    fontWeight: '500',
  },
  date: {
    fontSize: 14
  },
  replyNum: {
    position: 'absolute',
    right: 5,
    bottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e2e2e2',
    borderRadius: 10,
  },
});

export default TopicInfo;