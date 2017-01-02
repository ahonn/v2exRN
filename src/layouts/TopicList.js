import React, { Component } from 'react';
import { 
  Text,
  ListView,
  RefreshControl
} from 'react-native';
import Topic from './Topic';
import TopicRow from '../components/TopicRow';

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
    let data = this.props.data;
    data.then && this._updateData(data);
  }  

  componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			this._updateData(nextProps.data);
		}
	}

  _updateData(data) {
    data.then(arr => {
      this.setState({
        ds: this.state.ds.cloneWithRows(arr)
      });
    });
	}

  _onRefresh() {
    const { tab, actions } = this.props;

    this.setState({ isRefreshing: true });
    setTimeout(() => {
      actions.getTopicsByTab(tab);
      this.setState({ isRefreshing: false })
    }, 500)
  }

  _onPressItem(topic) {
    const { router } = this.props;
    router.push({
      name: 'topic',
      component: Topic,
      topic
    });
  }

  _renderRow(topic) {
    return (
      <TopicRow
        key={topic.id}
        topic={topic}
        onPress={this._onPressItem.bind(this)}
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

export const LayoutComponent = TopicList;
export function mapStateToProps(state, props) {
  const { tab } = props;
  const topics = state.topic[tab];
  return {
    data: topics,
  }
}