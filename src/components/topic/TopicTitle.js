import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class TopicTitle extends Component {
  render() {
    const { topic } = this.props; 

    return (
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          {topic.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleWrapper: {
    padding: 10,
    backgroundColor: '#efefef',
    borderRadius: 5,
  },
  title: {
    color: '#0a0a0a',
    fontSize: 16
  },
});

export default TopicTitle;