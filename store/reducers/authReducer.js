import jwtDecode from 'jwt-decode'
import * as actionTypes from '../actionTypes'

const initialState = {
  userId: null,
  loading: false,
  error: false,
  token: null,
  user: null,
  isAuth: false
}
  
  // REDUCERS
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.AUTH_START:
        return Object.assign({}, state, {
          loading: true
        })
      case actionTypes.AUTH_SUCCESS:
      const login_user = jwtDecode(action.token)
        return Object.assign({}, state, {
          token: action.token,
          user: {...login_user},
          userId: login_user.oid,
          loading: false,
          isAuth: true
        })
      case actionTypes.AUTH_FAIL:
        return Object.assign({}, state, {
            isAuth: false,
            userId: null,
          loading: false,
          error: action.error
        })
      default: return state
    }
  }