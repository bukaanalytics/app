import { connect } from 'react-redux';

// Actions
import { toNextWeek, toPrevWeek } from '@redux/dashboard/actions'

import Home from './HomeView'

const mapStateToProps = (state) => ({
  dashboard: state.dashboard
});

const mapDispatchToProps = {
  toNextWeek, toPrevWeek
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)