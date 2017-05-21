import { DASHBOARD } from '@redux/dashboard/actions'
import moment from 'moment'

const initialState = {
  latestDate: moment().day(7).unix(),
}

export default function dashboardReducer(state = initialState, action) {
  let newLatestDate

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
    default:
      return initialState
  }
}