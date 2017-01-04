import * as types from '../constants/ActionTypes';

const initialState = {
  tab: 'home'
};

export default function (state = initialState, action) {
  const { payload, error, meta = {}, type } = action;
  const { tab, id = '0' } = meta;
  switch (type) {
    case types.SWITCH_TAB:
      return {
        ...state,
        tab: payload,
      };
    default:
      return state;
  }
}