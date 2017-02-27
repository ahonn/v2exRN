import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import ScrollableTab from '../components/ScrollableTab';
import TopicList from '../components/TopicList';
import TopicPage from './TopicPage';
import api from '../api';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTabs: [
        { name: '全部', id: 'all'},
        { name: '最热', id: 'hot'},
        { name: '技术', id: 'tech'},
        { name: '创意', id: 'creative'},
        { name: '好玩', id : 'play'}
      ]
    };

    this._jumpTopic = this._jumpTopic.bind(this);
  }

  _jumpTopic(topic) {
    this.props.navigator.push({
      component: TopicPage,
      name: 'topic',
      params: { topic }
    });
  }

  render() {
    const { defaultTabs } = this.state;
    return (
      <ScrollableTab>
        {defaultTabs.map(tab => {
          return (
            <TopicList
              key={tab.id}
              tab={tab.id}
              tabLabel={tab.name}
              jumpTopic={(topic) => this._jumpTopic(topic)}
            />
          );
        })}
      </ScrollableTab>
    );
  }
}

export default HomePage;
