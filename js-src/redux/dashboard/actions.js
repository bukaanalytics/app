import BLApi from '@lib/BLApi'
import moment from 'moment';
import { Sqlite } from '../../lib/BLSqlite';
export const DASHBOARD = {
  TO_NEXT_WEEK: 'DASHBOARD_TO_NEXT_WEEK',
  TO_PREV_WEEK: 'DASHBOARD_TO_PREV_WEEK',
  GET_DASHBOARD_DATA: 'DASHBOARD_GET_DATA',
  SET_DASHBOARD_DATA: 'DASHBOARD_SET_DATA',
  SET_TRANSACTION_DATA: 'DASHBOARD_SET_TRANSACTION_DATA',
  RESET_TRANSACTION_DATA: 'DASHBOARD_RESET_TRANSACTION_DATA',
  FETCHING_TRANSACTION_DATA: 'DASHBOARD_FETCHING_TRANSACTION_DATA',
  FETCH_TRANSACTION_COMPLETED: 'DASHBOARD_FETCH_TRANSACTION_COMPLETED',
};

export function refreshData(refreshType) {
  let perPage = 1

  return function(dispatch, getState) {
    dispatch(fetchingTransactionData())
    dispatch(resetTransactionData())

    if (refreshType == 'next') {
      dispatch(setDateToNextWeek());
    } else if (refreshType == 'prev') {
      dispatch(setDateToPrevWeek());
    }

    let latestDate = getState().dashboard.latestDate
    let since = moment(latestDate, 'X').subtract(13, 'day').format('YYYY-MM-DD')

    dispatch(getSqliteData(latestDate));
    console.log(Sqlite);

    return BLApi.getTransactions({
      perPage: perPage,
      page: 1,
      since: since
    }, transactions => {
      dispatch(setTransactionData(transactions))
      if (transactions.length < perPage) dispatch(fetchTransactionCompleted())
    }, err => {
      console.log(err)
    })

  }
}

function fetchingTransactionData() {
  return {
    type: DASHBOARD.FETCHING_TRANSACTION_DATA
  }
}

function fetchTransactionCompleted() {
  return {
    type: DASHBOARD.FETCH_TRANSACTION_COMPLETED
  }
}

function resetTransactionData() {
  return {
    type: DASHBOARD.RESET_TRANSACTION_DATA
  }
}

function setTransactionData(transactions) {
  return {
    type: DASHBOARD.SET_TRANSACTION_DATA,
    payload: { transactions }
  }
}

function setDateToNextWeek() {
  return {
    type: DASHBOARD.TO_NEXT_WEEK
  }
}

function setDateToPrevWeek() {
  return {
    type: DASHBOARD.TO_PREV_WEEK
  }
}

function setData(key, value) {
  return {
    type: DASHBOARD.SET_DASHBOARD_DATA,
    key,
    value,
  };
}

function getSqliteData(latestDate) {
  const momentObj = moment(latestDate, 'X');
  const end_date = momentObj.format('YYYY-MM-DD');
  console.log('end_date is ');
  console.log(momentObj);
  const start_date = momentObj.day(-6).format('YYYY-MM-DD');
  console.log("start_date", start_date, "end_date", end_date);

  return dispatch => {
    Sqlite.getWeeklyView({
      start_date: start_date,
      end_date: end_date,
    }, (res) => {
      dispatch(setData('weekly_view', res));
    });

    Sqlite.getWeeklyLeastViewedProduct({
      start_date: start_date,
      end_date: end_date,
    }, (res) => {
      dispatch(setData('least_viewed', res));
    });

    Sqlite.getWeeklyTopViewedProduct({
      start_date: start_date,
      end_date: end_date,
    }, (res) => {
      dispatch(setData('most_viewed', res));
    });

    Sqlite.getWeeklyConvertionRate({
      start_date: start_date,
      end_date: end_date,
    }, (res) => {
      dispatch(setData('convertion_rate', res));
    });

    Sqlite.getWeeklyRevenueAttribution({
      start_date: start_date,
      end_date: end_date,
    }, (res) => {
      dispatch(setData('revenue_attribution', res));
    });
  };
}

function getDateRange(getState) {
  const latestDate = getState().dashboard.latestDate;
  const momentObj = moment(latestDate, 'X');

  const sundayDateStr = momentObj.format('YYYY-MM-DD');
  const mondayDateStr = momentObj.day(-6).format('YYYY-MM-DD');
  return { sundayDateStr, mondayDateStr };
}
