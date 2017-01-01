import React, { Component } from 'react';
import { 
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { parseImgUrl } from '../utils';

export default class TopicRow extends Component {

  render() {
    const { topic } = this.props;

    return (
      <TouchableHighlight
        key={topic.id}>
        <View style={styles.row}>
          <View style={styles.imgWrapper}>
            <Image
              ref={view => this.avatar = view}
              style={[styles.avatar]}
              source={{uri: parseImgUrl(topic.member.avatar_normal)}}>
            </Image>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  "row": {
		"height": 80,
		"padding": 20,
		"flexDirection": "row",
		"borderBottomColor": "rgba(0, 0, 0, 0.05)",
		"borderBottomWidth": 1,
	},
	"imgWrapper": {
		
	},
  "avatar": {
    "height": 40,
    "width": 40,
    "borderRadius": 20
  }
});
