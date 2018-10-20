import * as actionTypes from '../actionTypes'

const initialState = {
  //token: null,
  userId: null,
  isAuth: false,
  loading: false,
  error: false,
}
  
  // REDUCERS
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.AUTH_START:
        return Object.assign({}, state, {
          loading: true
        })
      case actionTypes.AUTH_SUCCESS:
        return Object.assign({}, state, {
          //token: action.token,
          loading: false,
          isAuth: true
        })
      case actionTypes.AUTH_FAIL:
        return Object.assign({}, state, {
            //token: null,
            isAuth: false,
            userId: null,
          loading: false,
          error: action.error
        })
      default: return state
    }
  }