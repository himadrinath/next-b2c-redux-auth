export const AUTH_START= 'AUTH_START'
export const AUTH_SUCCESS= 'AUTH_SUCCESS'
export const AUTH_FAIL= 'AUTH_FAIL'

export const authReducer =(state, action)=>{
    switch(action.type){
        case AUTH_START:
            return Object.assign({}, state, {
                loading: true
              })
        case AUTH_SUCCESS:
          return Object.assign({}, state, {
            userId: action.auth.uuid,
            name: action.auth.name,
            loading: false,
            isAuth: true,
            error: null
          })
        case AUTH_FAIL:
          return Object.assign({}, state, {
              isAuth: false,
              userId: null,
              name: null,
              loading: false,
              error: action.auth.error
          })
        default: return state
    }
}