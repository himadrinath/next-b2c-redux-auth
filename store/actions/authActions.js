import * as actionTypes from '../actionTypes'

export const authStart=() => dispatch => {
    dispatch({ type: actionTypes.AUTH_START})
}

export const authSuccess = (access_token) => dispatch => {
  return dispatch({ type: actionTypes.AUTH_SUCCESS, token: access_token })
}

export const authFail = (authError) => dispatch => {
  return dispatch({ type: actionTypes.AUTH_FAIL, err:  authError })
}