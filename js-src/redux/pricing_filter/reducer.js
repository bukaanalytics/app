import {
  PRICINGFILTER_ACTION_SET,
  PRICINGFILTER_ACTION_CLEAR,
} from './constant';

const initialState = {
  category_id: -1,
  nego: 1, // harus dimapping..
  harga_pas: 1, // harus dimapping
  top_seller: 0,
  conditions: '', // harus dimapping  antara new / used
  price_min: 0,
  price_max: 99999999,
  province: '',
  city: '',
};

export default function PricingFilterReducer(state = initialState, action) {
  switch (action.type) {
    case PRICINGFILTER_ACTION_SET :
      return { ...state, [action.key]: action.value };
    case PRICINGFILTER_ACTION_CLEAR :
      return { ...state, ...initialState };
    default:
      return state;
  }
}
