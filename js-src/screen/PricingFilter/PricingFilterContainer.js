import { connect } from 'react-redux';

// Actions
import * as PricingFilterActions from '@redux/pricing_filter/actions';

// View
import PricingFilter from './PricingFilterView'

const mapStateToProps = (state) => {
  // preprocess dulu baru mapping manual..
  const {
    category_id,
    nego,
    harga_pas,
    top_seller,
    conditions,
    price_min,
    price_max,
    province,
    city,
  } = state.pricing_filter;

  let bisa_nego = '';
  if (nego === 1 ){
    if (harga_pas === 1) {
      bisa_nego = 'all_prices';
    } else {
      bisa_nego = 'nego_only';
    }
  } else {
    bisa_nego = 'fixed_only';
  }

  let _top_seller = false;
  if(top_seller == 1) {
    _top_seller = true;
  }

  let _province = '';
  if(province) {
    _province = province.replace(" ","_");
  }

  const retval = {
    form_value: {
      kategori: `_${category_id}`,
      bisa_nego: bisa_nego,
      top_seller: _top_seller,
      province: _province,
      city: city,
      price_min: price_min,
      price_max: price_max,
    },
  }
  return retval;
};

const mapDispatchToProps = {
  setData: PricingFilterActions.setData,
  resetData: PricingFilterActions.resetData
};

export default connect(mapStateToProps, mapDispatchToProps)(PricingFilter)
