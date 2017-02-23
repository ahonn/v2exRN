import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import ScrollableTab from '../components/ScrollableTab';

class HomePage extends Component {
  render() {
    return (
      <ScrollableTab>
        <Text tabLabel='Topics1'>Topics1</Text>
        <Text tabLabel='Topics2'>Topics2</Text>
        <Text tabLabel='Topics3'>Topics3</Text>
        <Text tabLabel='Topics4'>Topics4</Text>
      </ScrollableTab>
    );
  }
}

export default HomePage;
