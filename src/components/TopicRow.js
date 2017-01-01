import React, { Component } from 'react';
import { 
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native';
import { parseImgUrl } from '../utils';

export default class TopicRow extends Component {

  render() {
    const { topic } = this.props;

    return (
      <TouchableHighlight
        key={topic.id}
        underlayColor='#EAEAEA' 
        onPress={() => {this.props.onPress(topic)}}>
        <View style={styles.row}>
          <View>
            <Image
              ref={view => this.avatar = view}
              style={[styles.avatar]}
              source={{uri: parseImgUrl(topic.member.avatar_normal)}}>
            </Image>
          </View>
          <View style={styles.topic}>
            <Text
              style={styles.title}
              ref={view => this.title = view}
              numberOfLines={1} >
              {topic.title}
            </Text>
            <View style={styles.info}>
              <Text style={styles.text}>
                {topic.member.username} 
              </Text>
              <Text style={styles.text}> - </Text>
              <Text style={styles.text}>
                {topic.node.title}
              </Text>
            </View>
          </View>
          <View style={styles.replies}>
            <Text style={styles.number}>{topic.replies}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const { width } = Dimensions.get('window');
var styles = StyleSheet.create({
  row: {
		height: 80,
		padding: 20,
		flexDirection: "row",
		borderBottomColor: "rgba(0, 0, 0, 0.05)",
		borderBottomWidth: 1,
	},
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  topic: {
    marginLeft: 15,
    width: width - 130
  },
  title: {
    color: '#334',
    fontSize: 15
  },
  info: {
    marginTop: 5,
    flexDirection: "row",
  },
  text: {
    fontSize: 12,
  },
  replies: {
    height: 18,
    position: "absolute",
    top: 20,
    right: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#334',
    borderRadius: 10,
  },
  number: {
    fontSize: 12,
    color: '#fff',
  }
});
