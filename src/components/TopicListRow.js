import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';
import theme from '../config/theme';
import { parseImageUrl } from '../utils';

class TopicLsitRow extends Component {
  render() {
    const { topic, onPressTopic } = this.props;
    return (
      <TouchableHighlight
        underlayColor={theme.color.lightGrey}
        onPress={() => onPressTopic(topic)}>
        <View style={styles.topic}>
          <View style={styles.left}>
            <Image
              style={styles.avatar}
              source={{ uri: parseImageUrl(topic.author.avatar)}}
            />
          </View>
          <View style={styles.mid}>
            <Text
              style={styles.title}
              numberOfLines={1}>
              {topic.title}
            </Text>
            <View style={styles.info}>
              <Text style={styles.node}>{topic.node.name}</Text>
              <Text style={styles.author}>{topic.author.name}</Text>
              <Text style={styles.lasttime}>{topic.lasttime}</Text>
            </View>
          </View>
          <View style={styles.right}>
            <Text style={styles.reply}>{topic.reply}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  topic: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
		borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  left: {
    width: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  mid: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    color: theme.color.black,
  },
  info: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  node: {
    fontSize: 11,
    marginRight: 8,
    paddingVertical: 1,
    paddingHorizontal: 5,
    backgroundColor: theme.color.grey,
    borderRadius: 5,
  },
  author: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 8,
  },
  lasttime: {
    fontSize: 11,
  },
  right: {
    width: 30,
    height: 18,
    borderRadius: 10,
    backgroundColor: theme.color.lightTheme,
  },
  reply: {
    fontSize: 12,
    color: theme.color.white,
    textAlign: 'center',
  }
});

export default TopicLsitRow;
