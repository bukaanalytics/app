import { connect } from 'react-redux';

// Actions
import * as UserActions from '@redux/user/actions';

import Home from './HomeView'

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)