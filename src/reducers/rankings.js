import {handleActions} from 'redux-actions'
import {FETCH_USER_RANKINGS} from '../actions'

const rankings = handleActions({
  [FETCH_USER_RANKINGS]: (state, action)=> {

    return {
      items: _.concat(
        _.get(state, 'items', []),
        action.payload.items
      )
    };
  }
}, {});

export default rankings