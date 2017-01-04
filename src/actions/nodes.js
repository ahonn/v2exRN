import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as api from '../api';

export const getAllNodes = createAction(types.GET_ALL_NODES, async () => {
  return await api.getAllNodes();
});