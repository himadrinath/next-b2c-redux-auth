import * as actionTypes from '../actionTypes'

export const authStart=() => dispatch => {
    dispatch({ type: actionTypes.AUTH_START})
}

export const authSuccess = (uuid, name) => dispatch => {
  return dispatch({ type: actionTypes.AUTH_SUCCESS, uuid: uuid, name: name })
}

export const authFail = (authError) => dispatch => {
  return dispatch({ type: actionTypes.AUTH_FAIL, error:  authError })
}