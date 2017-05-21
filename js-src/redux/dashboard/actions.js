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
  FETCH_TRANSACTION_COMPLETED: 'DASHBOARD_FETCH_TRANSACTION_COMPLETED'
};

export function toNextWeek() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 10);
    }).then(() => {
      dispatch({
        type: DASHBOARD.TO_NEXT_WEEK,
      });
    });
  }
}

export function toPrevWeek() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), 10);
    }).then(() => {
      dispatch({
        type: DASHBOARD.TO_PREV_WEEK,
      });
    });
  }
}

export function refreshData(refreshType) {
  let perPage = 1

  return function(dispatch, getState) {
    dispatch(fetchingTransactionData())
    dispatch(resetTransactionData())

    if (refreshType == 'next') dispatch(setDateToNextWeek())
    else if (refreshType == 'prev') dispatch(setDateToPrevWeek())

    let latestDate = getState().dashboard.latestDate
    let since = moment(latestDate, 'X').subtract(13, 'day').format('YYYY-MM-DD')

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

function setData(data) {
  return {
    type: DASHBOARD.SET_DASHBOARD_DATA,
    data,
  };
}

export function getNextWeekData() {
  return (dispatch, getState) => {
    dispatch(toNextWeek()).then(() => {
      const { sundayDateStr, mondayDateStr } = getDateRange(getState);
      console.log("Sekarang Monday : " + mondayDateStr);
      console.log("Sekarang Sunday : " + sundayDateStr);
      dispatch(getDashboardData(mondayDateStr, sundayDateStr));
    });
  };
}

export function getPrevWeekData() {
  return (dispatch, getState) => {
    dispatch(toPrevWeek()).then(() => {
      const { sundayDateStr, mondayDateStr } = getDateRange(getState);
      console.log("Sekarang Monday : " + mondayDateStr);
      console.log("Sekarang Sunday : " + sundayDateStr);
      dispatch(getDashboardData(mondayDateStr, sundayDateStr));
    });
  };
}

function getDashboardData(start_date, end_date) {
  return dispatch => {
    Sqlite.getWeeklyView({
      start_date: start_date,
      end_date: end_date,
    }, (res) => {
      dispatch(setData(res));
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
