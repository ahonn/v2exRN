import { combineReducers } from 'redux';
import topic from './topic';
import nodes from './nodes';
import navigation from './navigation';

export default combineReducers({
  topic,
  nodes,
  navigation,
});