import * as actionTypes from '../actionTypes'
  
  // REDUCERS
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.AUTH_START:
        return Object.assign({}, state, {
          loading: true
        })
      case actionTypes.AUTH_SUCCESS:
        return Object.assign({}, state, {
          userId: action.uuid,
          name: action.name,
          loading: false,
          isAuth: true,
          error: null
        })
      case actionTypes.AUTH_FAIL:
        return Object.assign({}, state, {
            isAuth: false,
            userId: null,
            name: null,
            loading: false,
            error: action.error
        })
      default: return state
    }
  }