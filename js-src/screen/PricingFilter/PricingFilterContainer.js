import { connect } from 'react-redux';

// Actions
import * as UserActions from '@redux/user/actions';

// View
import PricingFilter from './PricingFilterView'

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PricingFilter)
