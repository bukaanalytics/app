import { USER } from '@redux/user/actions'

const initialState = {
  loading: false,
  userId: 0,
  token: ''
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case USER.LOADING:
      return {
        ...state,
        loading: true
      }
    case USER.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userId: action.payload.userId,
        token: action.payload.token
      }
    case USER.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        userId: 0,
        token: ''
      }
    default:
      return state
  }
}