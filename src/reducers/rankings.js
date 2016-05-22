import {handleActions} from 'redux-actions'
import {FETCH_USER_RANKINGS} from '../actions'

const rankings = handleActions({
  [FETCH_USER_RANKINGS]: (state, action)=> {

    let {pageIndex} = action.payload;
    
    return {
      items: _.concat(
        _.slice(
          _.get(state, 'items', []), 0, pageIndex * 50
        ),
        _.get(action.payload, 'items', [])
      )
    };
  }
}, {});

export default rankings