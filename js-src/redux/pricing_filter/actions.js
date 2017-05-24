import {
  PRICINGFILTER_ACTION_SET,
  PRICINGFILTER_ACTION_CLEAR,
} from './constant';
// ini apa bib ? ntar tanyain ya .. pas hari h
// User action types

// User action creator
export function setData(key, value) {
  return {
    type: PRICINGFILTER_ACTION_SET,
    key,
    value,
  };
}

export function resetData() {
  return {
    type: PRICINGFILTER_ACTION_CLEAR,
  };
}

// ================================================
// Local functions, not exported
// ================================================
