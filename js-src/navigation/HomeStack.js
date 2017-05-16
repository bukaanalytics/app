import { StackNavigator } from 'react-navigation'
import HomeScreen from '@screen/Home/HomeContainer'
import navOptions from '@nav/NavOptions'

const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen
  }
}, {
  navigationOptions: navOptions
})

export default HomeStack