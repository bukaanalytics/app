import { DrawerNavigator } from 'react-navigation'
import { AppColors } from '@theme/'
import HomeStack from '@nav/HomeStack'
import PricingAnalysisStack from '@nav/PricingAnalysisStack'
import BidAnalysisStack from '@nav/BidAnalysisStack'

const Drawer = DrawerNavigator({
  HomeStack: {
    screen: HomeStack,
    navigationOptions: {
      drawerLabel: 'Home'
    }
  },
  PricingAnalysisStack: {
    screen: PricingAnalysisStack,
    navigationOptions: {
      drawerLabel: 'PricingAnalysis'
    }
  },
  BidAnalysisStack: {
    screen: BidAnalysisStack,
    navigationOptions: {
      drawerLabel: 'BidAnalysis'
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