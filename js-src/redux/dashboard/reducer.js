import { DASHBOARD } from '@redux/dashboard/actions'
import moment from 'moment'

const initialState = {
  latestDate: moment().day(7).unix(),
  rawTransactions: [],
  fetchingTransaction: false,
  currentRevenue: 0,
  previousRevenue: 0
}

export default function dashboardReducer(state = initialState, action) {
  let newLatestDate
  let newRawTransactions
  let revenueObj

  switch (action.type) {
    case DASHBOARD.TO_NEXT_WEEK:
      newLatestDate = moment(state.latestDate, 'X').add(7, 'day').unix()
      return {
        ...state,
        latestDate: newLatestDate
      }
    case DASHBOARD.TO_PREV_WEEK:
      newLatestDate = moment(state.latestDate, 'X').subtract(7, 'day').unix()
      return {
        ...state,
        latestDate: newLatestDate
      }

    case DASHBOARD.SET_TRANSACTION_DATA:
      newRawTransactions = state.rawTransactions.concat(action.payload.transactions)
      let endOfWeek = moment(state.latestDate, 'X').format()
      let startOfWeek = moment(endOfWeek).subtract(6, 'day').format()
      let endOfPrevWeek = moment(startOfWeek).subtract(1, 'day').format()
      let startOfPrevWeek = moment(endOfPrevWeek).subtract(6, 'day').format()

      revenueObj = action.payload.transactions.reduce((prev, current) => {
        let tempCR = prev.currentRevenue
        let tempPR = prev.previousRevenue
        if (current.state == 'remitted' && moment(current.created_at).isBetween(startOfWeek, endOfWeek, 'day')) tempCR += current.amount
        if (current.state == 'remitted' && moment(current.created_at).isBetween(startOfPrevWeek, endOfPrevWeek, 'day')) tempPR += current.amount

        return { currentRevenue: tempCR, previousRevenue: tempPR }
      }, {
        currentRevenue: state.currentRevenue,
        previousRevenue: state.previousRevenue
      })

      return {
        ...state,
        ...revenueObj,
        rawTransactions: newRawTransactions,
      }

    case DASHBOARD.RESET_TRANSACTION_DATA:
       return {
         ...state,
         rawTransactions: [],
         currentRevenue: 0,
         previousRevenue: 0
       }

    case DASHBOARD.FETCHING_TRANSACTION_DATA:
      return {
        ...state,
        fetchingTransaction: true
      }

    case DASHBOARD.FETCH_TRANSACTION_COMPLETED:
      return {
        ...state,
        fetchingTransaction: false
      }
    default:
      return initialState
  }
}