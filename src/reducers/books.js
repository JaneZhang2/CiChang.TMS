import {handleActions} from 'redux-actions'
import _ from 'lodash'
import {FETCH_BOOKS} from '../actions'

export default handleActions({
  [FETCH_BOOKS]: (state, action)=>
    _.concat(
      [{
        "bookId": 0,
        "bookName": "全部词书"
      }],
      action.payload
    )
}, {});