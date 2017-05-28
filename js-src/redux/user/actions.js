import BLApi from '@lib/BLApi'
import { Sqlite } from '@lib/BLSqlite';

// User action types
export const USER = {
  LOADING: 'USER_LOADING',
  LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
  LOGIN_FAILED: 'USER_LOGIN_FAILED'
}

// User action creator
export function login(username, password) {
  return function(dispatch) {
    dispatch(isLoading())

    let cred = { username, password }
    return BLApi.authenticateUser(cred, data => dispatch(loginSuccess(data)), err => dispatch(loginFailed()))
  }
}

function isLoading() {
  return {
    type: USER.LOADING
  }
}

function loginSuccess(data) {
  Sqlite.insertToken({
      userId: data.user_id,
      token: data.token
    })

  return {
    type: USER.LOGIN_SUCCESS,
    payload: {
      userId: data.user_id,
      token: data.token
    }
  }
}

function loginFailed() {
  return {
    type: USER.LOGIN_FAILED
  }
}