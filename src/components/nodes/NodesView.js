import React, { Component } from 'react';
import { 
  View,
  Text,
  ToolbarAndroid,
  StyleSheet,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const toolBarConfig = {
  title: '节点'
};

class NodesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeText: ''
    };
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          title={toolBarConfig.title}
          titleColor='#fff'
          style={styles.toolbar}
          navIconName='md-menu'
          onIconClicked={() => this.props.openDrawer()}
        />
        <View style={styles.content}>
          <TextInput 
            style={styles.input}
            placeholder='搜索节点'
            underlineColorAndroid='#334'
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  toolbar: {
    height: 56,
    backgroundColor: '#334',
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    fontSize: 18,
    paddingBottom: 5
  }
});

export default NodesView;