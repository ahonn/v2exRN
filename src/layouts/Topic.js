import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Topic extends Component {
  render() {
    const { topic } = this.props.route

    return (
      <Text>{topic.title}</Text>
    );
  }
}