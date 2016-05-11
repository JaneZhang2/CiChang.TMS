import {createStore, applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import fetch from '../middleware/fetch'
import {observableMiddleware} from 'redux-rx';
import reducer from '../reducers'

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  fetch,
  ({dispatch, getState})=> observableMiddleware
)(createStore);

export default createStoreWithMiddleware(reducer)
