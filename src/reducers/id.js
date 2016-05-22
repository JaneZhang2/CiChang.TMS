import {handleActions} from 'redux-actions'
import {FETCH_ORGANS} from '../actions'
import _ from 'lodash'

export default handleActions({
  [FETCH_ORGANS]: (state, action)=>_.get(action.payload, 'orgId')
}, 0);