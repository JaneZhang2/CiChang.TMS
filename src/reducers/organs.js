import {handleActions} from 'redux-actions'
import {FETCH_ORGANS} from '../actions'

const organs = handleActions({
  [FETCH_ORGANS]: (state, action)=> action.payload
}, {});

export default organs