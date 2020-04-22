import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {reducer} from '../store/reducers/authReducer'

const exampleInitialState={
  user_id: null,
  name: null,
  isAuth: false,
  loading: true,
  error: null,
}

export function initializeStore (initialState = exampleInitialState) {
  const composeEnhancers =
  process.env.NODE_ENV !== 'production' ?   
  composeWithDevTools({
      name: 'AnyName', actionsBlacklist: ['REDUX_STORAGE_SAVE']
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware),
  // other store enhancers if any
);

return createStore(reducer, initialState, enhancer)
}