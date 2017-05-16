import { StackNavigator } from 'react-navigation'
import BidAnalysisScreen from '@screen/BidAnalysis/BidAnalysisContainer'
import navOptions from '@nav/NavOptions'

const BidAnalysisStack = StackNavigator({
  BidAnalysis: {
    screen: BidAnalysisScreen
  }
}, {
  navigationOptions: navOptions
})

export default BidAnalysisStack