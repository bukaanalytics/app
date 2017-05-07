import React, { Component } from 'react'
import { connect } from 'react-redux';
import { DrawerNavigator, StackNavigator, addNavigationHelpers } from 'react-navigation';

import HomeScreen from '@screen/Home/HomeContainer'
import ExampleScreen from '@screen/Example/ExampleContainer'

const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Example: {
    screen: ExampleScreen
  }
})

const ExampleStack = StackNavigator({
  Example: {
    screen: ExampleScreen
  }
})

export const AppNavigator = DrawerNavigator({
  HomeStack: {
    screen: HomeStack
  },
  ExampleStack: {
    screen: ExampleStack
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