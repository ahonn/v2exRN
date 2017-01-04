import * as types from '../constants/ActionTypes';

const initialState = {
  all: []
};

export default function (state = initialState, action) {
  const { payload, error, meta = {}, type } = action;
  const { tab, id = '0' } = meta;
  switch (type) {
    case types.GET_ALL_NODES:
      return {
        ...state,
        all: payload,
      };
    default:
      return state;
  }
}