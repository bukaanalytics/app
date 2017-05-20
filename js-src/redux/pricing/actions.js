import axios from 'axios';
import BLApi from '../../lib/BLApi';
import {
  PRICING_ACTION_SET,
  PRICING_ACTION_FILTER,
  PRICING_ACTION_FETCHING,
  PRICING_ACTION_CALCULATING,
} from './constant';
// ini apa bib ? ntar tanyain ya .. pas hari h
// User action types
export const USER = [{
  LOGIN: 'USER_LOGIN',
}];

// User action creator
export function setData(data) {
  return {
    type: PRICING_ACTION_SET,
    data,
  };
}

export function fetching(flag) {
  return {
    type: PRICING_ACTION_FETCHING,
    flag,
  };
}

export function calculating(flag) {
  return {
    type: PRICING_ACTION_CALCULATING,
    flag,
  };
}

export function filter(filter) {
  return {
    type: PRICING_ACTION_FILTER,
    filter,
  };
}

export function getGraph(keyword, filter = null) {
  return dispatch => {
    const promises = [];
    const sampling = 5;
    for (let i = 0; i < sampling; i++) {
      promises.push(BLApi.getProducts(i, keyword));
    }

    // set loading
    dispatch(fetching(true));

    return axios.all(promises).then(responses => {
      dispatch(fetching(false));
      dispatch(calculating(true));

      // tell ui component that fetching is completed
      const tmp_resp = responses.map(r => r.data);

      // collecting all datas
      let prices = [];
      tmp_resp.forEach(t => {
        prices = prices.concat(BLApi.parsePrice(t));
      });

      const result = BLApi.mathAnalysis(prices);

      // tell ui component that calculation is completed
      dispatch(calculating(false));
      dispatch(setData(result));
    })
    .catch(error => {
      throw (error);
    });
  };
}

// ================================================
// Local functions, not exported
// ================================================
