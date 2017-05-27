import { connect } from 'react-redux';

// Actions
import * as PricingActions from '@redux/pricing/actions';

import PricingAnalysis from './PricingAnalysisView';

const mapStateToProps = (state) => {
  const { min_price, max_price, avg_price, best_price, graph, isFetching, isCalculating } = state.pricing;
  const pricing_filter = state.pricing_filter;
  return { max_price, min_price, avg_price, best_price, graph, pricing_filter, isFetching, isCalculating };
};

const mapDispatchToProps = {
  getGraph: PricingActions.getGraph,
  setFilter: PricingActions.filter,
};

export default connect(mapStateToProps, mapDispatchToProps)(PricingAnalysis);
