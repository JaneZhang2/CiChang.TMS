import {handleActions} from 'redux-actions'
import {FETCH_BOOKS} from '../actions'

export default handleActions({
  [FETCH_BOOKS]: (state, action)=> action.payload
}, {});