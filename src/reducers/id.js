import {handleActions} from 'redux-actions'
import {FETCH_ORGANS_BY_USERS, FETCH_ORGANS_BY_CLASS} from '../actions'
import _ from 'lodash'

export default handleActions({
  [FETCH_ORGANS_BY_USERS]: (state, action)=>_.get(action.payload, 'orgId', 0),
  [FETCH_ORGANS_BY_CLASS]: (state, action)=>_.get(action.payload, 'orgId', 0)
}, 0);