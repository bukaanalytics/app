export const DASHBOARD = {
  TO_NEXT_WEEK: 'DASHBOARD_TO_NEXT_WEEK',
  TO_PREV_WEEK: 'DASHBOARD_TO_PREV_WEEK'
}

export function toNextWeek() {
  return {
    type: DASHBOARD.TO_NEXT_WEEK
  }
}

export function toPrevWeek() {
  return {
    type: DASHBOARD.TO_PREV_WEEK
  }
}