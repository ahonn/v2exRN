import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';

export const switchTab = createAction(types.SWITCH_TAB, (tab) => tab);