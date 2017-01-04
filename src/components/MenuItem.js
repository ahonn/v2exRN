import React, { Component } from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class TabItem extends Component {
  render() {
    const { icon, title, selected} = this.props;
    const selectedStyle = selected && styles.selected;

    return (
      <TouchableHighlight 
        underlayColor='#EAEAEA'
        onPress={this.props.onPress} >
        <View style={[styles.container, selectedStyle]}>
          <Icon name={icon} size={20} color="#334" style={styles.icon}/>
          <Text style={styles.title} >{title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 20,
  },
  title: {
    fontSize: 15,
  },
  selected: {
    backgroundColor: '#EAEAEA',
  }
});

export default TabItem;