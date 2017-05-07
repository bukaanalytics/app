import { AppNavigator } from '@nav/index'

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));

export default function navReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state
}