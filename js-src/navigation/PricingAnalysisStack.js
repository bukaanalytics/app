import { StackNavigator } from 'react-navigation';
import PricingAnalysisScreen from '@screen/PricingAnalysis/PricingAnalysisContainer';
import PricingFilterScreen from '@screen/PricingFilter/PricingFilterContainer';
import navOptions from '@nav/NavOptions';
import { AppColors } from '@theme';

const PricingAnalysisStack = StackNavigator({
  PricingAnalysis: {
    screen: PricingAnalysisScreen,
    navigationOptions: navOptions,
  },
  FilterScreen: {
    screen: PricingFilterScreen,
  },
});

export default PricingAnalysisStack;
