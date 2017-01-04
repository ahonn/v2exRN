import React, { Component } from 'react';
import { 
  Text,
  ListView,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';
import TopicListRow from './TopicListRow';

class TopicList extends Component {
  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds,
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this._onRefresh();
  }

  componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			this._updateData(nextProps.data);
		}
	}

  _updateData(data) {
    data.then(arr => {
      this.setState({
        ds: this.state.ds.cloneWithRows(arr),
        isRefreshing: false
      });
    });
	}

  _onRefresh() {
    const { tab, actions } = this.props;

    this.setState({ isRefreshing: true });
    setTimeout(() => {
      actions.getTopicsByTab(tab);
      setTimeout(() => this.setState({ isRefreshing: false }), 300);
    }, 500);
  }

  _onPressItem(topic) {
    this.props.navigator.push({
      topic
    });
  }

  _renderRow(topic) {
    return (
      <TopicListRow
        key={topic.id}
        topic={topic}
        onPress={this._onPressItem.bind(this)}
        navigator={this.props.navigator}
      />
    );  
  }

  render() {
    const { isRefreshing } = this.state;

    return (
      <ListView
        dataSource={this.state.ds}
        renderRow={this._renderRow.bind(this)}
        refreshControl={
          <RefreshControl
            ref={view => this.refreshControl = view}
            refreshing={isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const { tab } = props;
  const topics = state.topic[tab];
  return {
    data: topics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicList);