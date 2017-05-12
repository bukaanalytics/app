import React, { Component } from 'react'
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';

import Drawer from '@nav/Drawer'
import navOptions from '@nav/NavOptions'
import LoginScreen from '@screen/Login/LoginContainer'
import { AppColors } from '@theme/'

export const AppNavigator = StackNavigator({
  DrawerScreen: {
    screen: Drawer
  },
  LoginScreen: {
    screen: LoginScreen
  }
}, {
  navigationOptions: {
    header: null
  }
})

class AppWithNavigationState extends Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    )
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState)