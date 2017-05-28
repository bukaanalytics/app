import moment from 'moment';
import { Sqlite } from '../../lib/BLSqlite';
import {
  BIDDING_ACTION_SET,
} from './constant';

// Sementara ini asumsi no_ads = 2 minggu lalu, with ads = 1 minggu lalu
export function refreshBiddingData() {
  return (dispatch, getState) => {
    const latestDate = getState().dashboard.latestDate;
    // diganti dulu ya .. sebelumnya ada kontrol
    const momentObj = moment(); //moment(latestDate, 'X');

    const end_ads = moment(momentObj, 'X').format('YYYY-MM-DD');
    const start_ads = moment(momentObj, 'X').day(1).format('YYYY-MM-DD');
    const end_no_ads = moment(momentObj, 'X').day(0).format('YYYY-MM-DD');
    const start_no_ads = moment(momentObj, 'X').day(-6).format('YYYY-MM-DD');

    Sqlite.getBidSuggestion({
      start_ads: start_ads,
      end_ads: end_ads,
      start_no_ads: start_no_ads,
      end_no_ads: end_no_ads,
    }, (res) => {
      dispatch(setData('bid_suggestion', res));
    });
  };
}

function setData(key, value) {
  return {
    type: BIDDING_ACTION_SET,
    key,
    value,
  };
}
