import { DASHBOARD } from '@redux/dashboard/actions'
import moment from 'moment'

const initialState = {
  latestDate: moment().day(7).unix(),
  rawTransactions: [],
  fetchingTransaction: false
}

export default function dashboardReducer(state = initialState, action) {
  let newLatestDate
  let newRawTransactions

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

    case DASHBOARD.SET_RAW_TRANSACTION_DATA:
      newRawTransactions = state.rawTransactions.concat(action.payload.transactions)

      return {
        ...state,
        rawTransactions: newRawTransactions
      }

    case DASHBOARD.RESET_TRANSACTION_DATA:
       return {
         ...state,
         rawTransactions: []
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