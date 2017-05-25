import { combineReducers } from 'redux';

import dashboard from '@redux/dashboard/reducer';
import nav from '@redux/nav/reducer';
import user from '@redux/user/reducer';
import pricing from '@redux/pricing/reducer';
import pricing_filter from '@redux/pricing_filter/reducer';
import bidding from '@redux/bidding/reducer';

// Combine all
const appReducer = combineReducers({
  dashboard,
  nav,
  user,
  pricing,
  pricing_filter,
  bidding,
});

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
};

export default rootReducer;
