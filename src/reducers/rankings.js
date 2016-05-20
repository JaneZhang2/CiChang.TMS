import {handleActions} from 'redux-actions'
import {FETCH_USER_RANKINGS} from '../actions'

const rankings = handleActions({
  [FETCH_USER_RANKINGS]: (state, action)=> {

    let {pageIndex} = action.payload;

    console.log(
      _.concat(
        _.slice(
          _.get(state, 'items', []), 0, (pageIndex - 1) * 50
        ),
        action.payload.items
      )
    )

    return {
      items: _.concat(
        _.slice(
          _.get(state, 'items', []), 0, pageIndex * 50
        ),
        action.payload.items
      )
    };
  }
}, {});

export default rankings