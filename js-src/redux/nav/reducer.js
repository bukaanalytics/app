import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '@nav/index'

const initialState = AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'LoginScreen' }));

export default function navReducer(state = initialState, action) {
  let nextState
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state
}