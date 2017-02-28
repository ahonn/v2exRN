import React, { Component } from 'react';
import {
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import HTMLView from 'react-native-htmlview';

const { width, height } = Dimensions.get('window');

class HTMLRender extends Component {
  constructor(props) {
    super(props);

    this._renderNode = this._renderNode.bind(this);
  }

  _renderNode(node, index, list) {
    if (node.type == 'tag' && node.name == 'img') {
      const source = {
        uri: node.attribs.src,
      };

      return <Image key={index} source={source} style={styles.image} />;
    }
    return undefined;
  }

  render() {
    return (
      <HTMLView
        value={this.props.value}
        renderNode={this._renderNode}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: width - 30,
    height: height - 30,
  }
});

export default HTMLRender;
