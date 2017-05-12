import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { DrawerItems, DrawerNavigator, StackNavigator, addNavigationHelpers } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons'

import HomeScreen from '@screen/Home/HomeContainer'
import LoginScreen from '@screen/Login/LoginContainer'
import ExampleScreen from '@screen/Example/ExampleContainer'
import { AppColors } from '@theme/'

const navOptions = ({navigation}) => ({
      title: 'BukaAnalytics',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: AppColors.brand.primary },
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.navigate('DrawerOpen')}
          style={{justifyContent: 'center', alignItems: 'center', padding: 8, paddingTop: 12}}>
          <Icon name='menu' color='white' size={30} />
        </TouchableOpacity>
      )
    })

const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Example: {
    screen: ExampleScreen
  }
}, {
  navigationOptions: navOptions
})

const ExampleStack = StackNavigator({
  Example: {
    screen: ExampleScreen
  }
}, {
  navigationOptions: navOptions
})

const DrawerScreen = DrawerNavigator({
  HomeStack: {
    screen: HomeStack
  },
  ExampleStack: {
    screen: ExampleStack
  }
}, {
  contentOptions: {
    activeTintColor: '#fff',
    inactiveTintColor: '#fff',
    activeBackgroundColor: AppColors.brand.secondary,
    style: {
      flex: 1,
      backgroundColor: AppColors.brand.primary,
      paddingTop: 0
    }
  }
});

export const AppNavigator = StackNavigator({
  DrawerScreen: {
    screen: DrawerScreen
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