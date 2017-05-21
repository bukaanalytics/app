import { connect } from 'react-redux';

// Actions
import { toNextWeek, toPrevWeek, getNextWeekData, getPrevWeekData } from '@redux/dashboard/actions'

import Home from './HomeView'

const mapStateToProps = (state) => ({
  dashboard: state.dashboard
});

const mapDispatchToProps = {
  toNextWeek, toPrevWeek, getNextWeekData, getPrevWeekData
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)
