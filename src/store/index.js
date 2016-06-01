import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import fetch from '../middleware/fetch'
import promiseMiddleware from 'redux-promise';
import reducer from '../reducers'

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  fetch,
  promiseMiddleware
)(createStore);

export default createStoreWithMiddleware(reducer)
