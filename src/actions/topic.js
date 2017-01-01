import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as api from '../api';

export const getTopicsByTab = createAction(types.GET_TOPICS_BY_TAB, async(tab) => {
  return await api.getTopicsByTab(tab);
}, tab => ({tab}));