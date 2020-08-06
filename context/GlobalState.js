import React, { useReducer } from 'react';
import {msalApp, GRAPH_REQUESTS} from '../lib/authentication'
import AuthContext from './authContext';
import { authReducer, AUTH_START, AUTH_SUCCESS, AUTH_FAIL } from './reducers';


const GlobalState = props => {
  const [authState, dispatch] = useReducer(authReducer,
    {
        user_id: null,
        name: null,
        isAuth: false,
        loading: false,
        error: null
    });
    const authentication= new msalApp()

const login=()=>{
    dispatch({type: AUTH_START})

    authentication.app.loginPopup(GRAPH_REQUESTS.LOGIN).then(token=>{
      if(token.error==null)
      {
      const{name, sub}= token.idTokenClaims
      dispatch({type: AUTH_SUCCESS, auth:{sub, name}})
      }
      else
      {
        dispatch({type: AUTH_FAIL, auth:{error: token.error}})
      }
    }).catch(error=>{
        dispatch({type: AUTH_FAIL, auth:{error: error.message}})
    })
  }

  const logout=()=>{
    authentication.app.logout();
  }

  const signinInit=()=>{
    dispatch({type: AUTH_START})
  }
  
  const acquireToken=async ()=>{
    await authentication.app.acquireTokenSilent(GRAPH_REQUESTS.LOGIN).then(jwt=>{
        const{name, sub}= jwt.idTokenClaims
            dispatch({type: AUTH_SUCCESS, auth:{sub, name}})
    })
    .catch(acqure=> {
        dispatch({type: AUTH_FAIL, auth:{error: acqure.error}})
    })
  }

  return (
    <AuthContext.Provider
                value={{
                auth: authState,
                signin: login,
                signinInit: signinInit,
                signout: logout,
                acquire: acquireToken,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default GlobalState;