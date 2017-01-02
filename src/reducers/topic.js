import * as types from '../constants/ActionTypes';

const initialState = {
  latest: [],
  hot: [],
  tech: [],
  ideas: [],
  topics: {},
  replies: {},
};

export default function (state = initialState, action) {
  const { payload, error, meta = {}, type } = action;
  const { tab, id = '0' } = meta;
  switch (type) {
    case types.GET_TOPICS_BY_TAB:
      return {
        ...state,
        [tab]: payload,
      };
    case types.UPDATE_TOPIC_BY_ID:
      return {
        ...state,
        topics: {
          ...state.topics,
          [id]: payload,
        }
      };
    case types.UPDATE_TOPIC_REPLIES_BY_ID:
      return {
        ...state,
        replies: {
          ...state.replies,
          [id]: payload,
        }
      };
    default:
      return state;
  }
}