import { connect } from 'react-redux';

// Actions

import Login from './LoginView'

const mapStateToProps = (state) => ({
  nav: state.nav
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)