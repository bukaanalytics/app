import { connect } from 'react-redux';
import { login } from '@redux/user/actions'

// Actions

import Login from './LoginView'

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)