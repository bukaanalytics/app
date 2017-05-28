import { connect } from 'react-redux';

// Actions
import { refreshBiddingData } from '@redux/bidding/actions';
import { refreshData } from '@redux/dashboard/actions'

import BidAnalysis from './BidAnalysisView';

const mapStateToProps = (state) => ({
  bidding: state.bidding,
  dashboard: state.dashboard,
});

const mapDispatchToProps = {
  refreshBiddingData: refreshBiddingData,
  refreshData: refreshData,
};

export default connect(mapStateToProps, mapDispatchToProps)(BidAnalysis);
