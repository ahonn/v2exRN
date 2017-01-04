import React, { Component } from 'react';
import { 
  Text,
  View,
  ListView,
  StyleSheet
} from 'react-native';

class NodeList extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds,
    };
  }

  componentWillReceiveProps(nextProps) {
		if (nextProps.nodes !== this.props.nodes) {
			this.setState({
        ds: this.state.ds.cloneWithRows(nextProps.nodes)
      });
		}
	}

  _renderRow(node, section, row) {
    const isStart = row%2 == 0;

    return (
      <View style={styles.node}>
        <Text style={styles.nodeText}>
          {node.title}
        </Text>
      </View>
    );
  }

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <ListView 
          initialListSize={100}
          contentContainerStyle={styles.list}
          dataSource={this.state.ds}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  node: {
    width: 100,
    height: 40,
    padding: 5,
    margin: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
    justifyContent: 'center',
  },
  nodeText: {
    textAlign: 'center',
  }
});

export default NodeList;