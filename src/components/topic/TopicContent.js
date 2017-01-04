import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking
} from 'react-native';
import HtmlRender from 'react-native-html-render';

class TopicTitle extends Component {
  render() {
    const { topic } = this.props; 
    const content = topic.content_rendered;
    const html = `<p>${content}</p>`;

    return (
      <View style={styles.topicContent}>
        <View style={styles.html}> 
          <HtmlRender
            value={html}
            stylesheet={styles}
            onLinkPress={url => Linking.openURL(url)}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  html: {
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
  },
  pwrapper: {
    marginTop: 5,
    marginBottom: 5,
  },
  p: {
    fontSize: 14,
  }
});

export default TopicTitle;