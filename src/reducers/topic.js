import * as types from '../constants/ActionTypes';

const initialState = {
  latest: [],
  hot: [],
  tech: [],
  ideas: [],
  topics: {},
};

export default function (state = initialState, action) {
  const { payload, error, meta = {}, type } = action;
  const { tab } = meta;
  switch (type) {
    case types.GET_TOPICS_BY_TAB:
      return {
        ...state,
        [tab]: payload,
      };
    default:
      return state;
  }
}