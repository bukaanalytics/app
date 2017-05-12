import { StackNavigator } from 'react-navigation'
import PricingAnalysisScreen from '@screen/PricingAnalysis/PricingAnalysisContainer'
import navOptions from '@nav/NavOptions'

const PricingAnalysisStack = StackNavigator({
  PricingAnalysis: {
    screen: PricingAnalysisScreen
  }
}, {
  navigationOptions: navOptions
})

export default PricingAnalysisStack