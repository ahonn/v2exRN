import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as api from '../api';

export const getTopicsByTab = createAction(types.GET_TOPICS_BY_TAB, async (tab) => {
  return await api.getTopicsByTab(tab);
}, tab => ({tab}));

export const updateTopicById = createAction(types.UPDATE_TOPIC_BY_ID, async (id) => {
  return await api.getTopicById(id);
}, id => ({id}));

export const updateTopicRepliesById = createAction(types.UPDATE_TOPIC_REPLIES_BY_ID, api.getTopicRepliesById, id => ({id}));