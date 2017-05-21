import moment from 'moment'
import BLApi from '@lib/BLApi'

export const DASHBOARD = {
  TO_NEXT_WEEK: 'DASHBOARD_TO_NEXT_WEEK',
  TO_PREV_WEEK: 'DASHBOARD_TO_PREV_WEEK',
  SET_TRANSACTION_DATA: 'DASHBOARD_SET_TRANSACTION_DATA',
  RESET_TRANSACTION_DATA: 'DASHBOARD_RESET_TRANSACTION_DATA',
  FETCHING_TRANSACTION_DATA: 'DASHBOARD_FETCHING_TRANSACTION_DATA',
  FETCH_TRANSACTION_COMPLETED: 'DASHBOARD_FETCH_TRANSACTION_COMPLETED'
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