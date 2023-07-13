import {SELECT_CARD} from '../actions/actionTypes';

const initialState = {
  isShow: false,
};

export function cardReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_CARD:
      return {
        ...state,
      };
    default:
      return state;
  }
}
