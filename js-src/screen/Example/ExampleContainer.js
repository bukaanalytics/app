import { connect } from 'react-redux';

// Actions
import * as UserActions from '@redux/user/actions';

// View
import Example from './ExampleView'

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Example)