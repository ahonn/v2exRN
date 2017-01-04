import React, { Component } from 'react';
import { 
  TextInput,
  StyleSheet
} from 'react-native';

class NodeSearch extends Component {
  render() {
    return (
       <TextInput 
          style={styles.input}
          placeholder='搜索节点'
          underlineColorAndroid='#334'
          onChangeText={this.props.onChangeText}
        />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingBottom: 5,
    marginLeft: 15,
    marginRight: 15
  }
});

export default NodeSearch;