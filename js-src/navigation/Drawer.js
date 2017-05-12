import { DrawerNavigator } from 'react-navigation'
import { AppColors } from '@theme/'
import HomeStack from '@nav/HomeStack'

const Drawer = DrawerNavigator({
  HomeStack: {
    screen: HomeStack,
    navigationOptions: {
      drawerLabel: 'Home'
    }
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

export default Drawer