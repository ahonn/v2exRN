import { createStore } from 'redux';
import reducers from '../reducers';

export default () => {
  return createStore(reducers);
};