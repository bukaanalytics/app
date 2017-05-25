import {
  BIDDING_ACTION_SET,
} from './constant';
import moment from 'moment'

const initialState = {
  bid_suggestion: [],
};

export default function biddingReducer(state = initialState, action) {
  switch (action.type) {
    case BIDDING_ACTION_SET:
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
}
