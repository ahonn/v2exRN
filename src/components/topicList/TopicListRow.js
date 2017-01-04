import React, { Component } from 'react';
import { 
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { parseImgUrl } from '../../utils';
import moment from 'moment';

class TopicListRow extends Component {

  _onPressNode(node) {
    this.props.navigator.push({
      node
    });
  }

  render() {
    const { topic } = this.props;
    const date = moment.unix(topic.created).fromNow();

    return (
      <TouchableHighlight
        key={topic.id}
        underlayColor='#EAEAEA' 
        onPress={this.props.onPress.bind(this, topic)}>
        <View style={styles.row}>
          <View>
            <Image
              ref={view => this.avatar = view}
              style={[styles.avatar]}
              source={{uri: parseImgUrl(topic.member.avatar_normal)}}>
            </Image>
          </View>
          <View style={styles.topic}>
            <View style={styles.titleWrapper}>
              <Text
                style={styles.title}
                ref={view => this.title = view}
                numberOfLines={1} >
                {topic.title}
              </Text>
            </View>
            <View style={styles.info}>
              <TouchableOpacity 
                style={styles.nodeWrapper}
                 onPress={this._onPressNode.bind(this, topic.node)}
              >
                <Text style={styles.node}>
                  {topic.node.title}
                </Text>
              </TouchableOpacity>
              <View style={styles.usernameWrapper}>
                <Text style={styles.username}>
                  {topic.member.username} 
                </Text>
              </View>
              <Text style={styles.date}>
                {date}
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
		flexDirection: 'row',
		borderBottomColor: 'rgba(0, 0, 0, 0.05)',
		borderBottomWidth: 1,
	},
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  topic: {
    marginLeft: 15,
    width: width - 100
  },
  titleWrapper: {
    width: width - 130
  },
  title: {
    color: '#334',
    fontSize: 15
  },
  info: {
    marginTop: 5,
    flexDirection: 'row',
  },
  nodeWrapper: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    marginRight: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  node: {
    fontSize: 10,
  },
  usernameWrapper: {
    marginRight: 10,
  },
  username: {
    fontSize: 12,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
  },
  replies: {
    height: 18,
    position: 'absolute',
    top: 20,
    right: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#aab0c6',
    borderRadius: 10,
  },
  number: {
    fontSize: 12,
    color: '#fff',
  }
});

export default TopicListRow;