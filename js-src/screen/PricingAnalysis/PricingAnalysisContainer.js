import { connect } from 'react-redux';

// Actions
import * as PricingActions from '@redux/pricing/actions';

import PricingAnalysis from './PricingAnalysisView';

const mapStateToProps = (state) => {
  const { min_price, max_price, avg_price, best_price, graph } = state.pricing;
  return { max_price, min_price, avg_price, best_price, graph };
};

const mapDispatchToProps = {
  getGraph: PricingActions.getGraph,
  setFilter: PricingActions.filter,
};

export default connect(mapStateToProps, mapDispatchToProps)(PricingAnalysis);
