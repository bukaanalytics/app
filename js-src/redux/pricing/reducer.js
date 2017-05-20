import {
  PRICING_ACTION_SET,
  PRICING_ACTION_FILTER,
  PRICING_ACTION_FETCHING,
  PRICING_ACTION_CALCULATING,
} from './constant';

const initialState = {
  graph: [], // array of object, please refer to react-node-pathjs-charts format
  max_price: 0,
  min_price: 0,
  avg_price: 0,
  best_price: 0,
  filter: {}, // Please refer to superagent passing params to http get. used to store filter
  isFetching: false,
  isCalculating: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case PRICING_ACTION_SET : {
      const { min_price, max_price, avg_price, best_price, graph } = action.data;
      return { ...state, max_price, min_price, avg_price, best_price, graph };
    }
    case PRICING_ACTION_FILTER :
      return state;
    case PRICING_ACTION_FETCHING :
      return { ...state, isFetching: action.flag };
    case PRICING_ACTION_CALCULATING :
      return { ...state, isCalculating: action.flag };
    default:
      return state;
  }
}
