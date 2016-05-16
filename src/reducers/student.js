import {handleActions} from 'redux-actions'
import {FETCH_STUDENT} from '../actions'

export default handleActions({
  [FETCH_STUDENT]: (state, action)=> action.payload
}, {});