import { combineReducers } from 'redux';

import nav from '@redux/nav/reducer'
import user from '@redux/user/reducer'

// Combine all
const appReducer = combineReducers({
  nav,
  user
});

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
};

export default rootReducer;