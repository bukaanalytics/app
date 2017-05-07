import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DrawerNavigator, addNavigationHelpers } from 'react-navigation';

import HomeScreen from '@screen/Home/HomeContainer'
import ExampleScreen from '@screen/Example/ExampleContainer'

export const AppNavigator = DrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Example: {
    screen: ExampleScreen
  }
});

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