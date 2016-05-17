import {handleActions} from 'redux-actions'
import {FETCH_USER_RANKINGS} from '../actions'

const rankings = handleActions({
  [FETCH_USER_RANKINGS]: (state, action)=> {

    console.log(_.get(state, 'items', []))

    return {
      items: _.concat(
        _.get(state, 'items', []),
        action.payload.items
      )
    };
  }
}, {});

export default rankings