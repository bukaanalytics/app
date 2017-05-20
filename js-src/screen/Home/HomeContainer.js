import { connect } from 'react-redux';

// Actions
import { refreshData } from '@redux/dashboard/actions'

import Home from './HomeView'

const mapStateToProps = (state) => ({
  dashboard: state.dashboard
});

const mapDispatchToProps = {
  refreshData
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)