import React, { Component } from 'react';
import { 
  View,
  Text,
  ToolbarAndroid,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import NodeSearch from './NodeSearch';
import NodeList from './NodeList';
import actions from '../../actions';

const toolBarConfig = {
  title: '节点'
};

class NodesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: props.nodes,
      nodes: props.nodes, 
      isRefreshing: true,
    };
  }

  componentDidMount() {
    this._onRefresh();
  }

  componentWillReceiveProps(nextProps) {
		if (nextProps.nodes !== this.props.nodes) {
			this._updateNodes(nextProps.nodes);
		}
	}

  _updateNodes(nodes) {
    nodes.then(nodes => {
      this.setState({
        all: nodes,
        nodes: nodes
      });
    });
	}

  _onRefresh() {
    this.setState({ isRefreshing: true });
    setTimeout(() => {
      this.props.actions.getAllNodes();
      this.setState({ isRefreshing: false });
    }, 1000);
  }

  _onChangeText(text) {
    const { all } = this.state;
    const re = new RegExp(text, 'i');
    let nodes = all.filter(node => {
      return node.title.search(re) >= 0;
    });
    this.setState({
      nodes: nodes,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
          title={toolBarConfig.title}
          titleColor='#fff'
          style={styles.toolbar}
          navIconName='md-menu'
          onIconClicked={() => this.props.openDrawer()}
        />
        <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing} 
                onRefresh={this._onRefresh.bind(this)} />
            }>
          <NodeSearch onChangeText={this._onChangeText.bind(this)} />
          <View style={styles.list}>
            <NodeList nodes={this.state.nodes} />
          </View>
        </ScrollView>
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
});

const mapStateToProps = (state, props) => {
  return {
    nodes: state.nodes.all,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NodesView);