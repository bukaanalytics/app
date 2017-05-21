import { Sqlite } from '../../lib/BLSqlite';
import moment from 'moment';
export const DASHBOARD = {
  TO_NEXT_WEEK: 'DASHBOARD_TO_NEXT_WEEK',
  TO_PREV_WEEK: 'DASHBOARD_TO_PREV_WEEK',
  GET_DASHBOARD_DATA: 'DASHBOARD_GET_DATA',
  SET_DASHBOARD_DATA: 'DASHBOARD_SET_DATA',
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

export function setData(data) {
  return {
    type: DASHBOARD.SET_DASHBOARD_DATA,
    data
  }
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
