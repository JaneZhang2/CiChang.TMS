import {handleActions} from 'redux-actions'
import {FETCH_USER_RANKINGS} from '../actions'

const rankings = handleActions({
  [FETCH_USER_RANKINGS]: (state, action)=> {
    let {payload} = action;

    if (payload.loading) {
      return _.assign({loading: true}, state);
    }

    if (payload instanceof Error) {
      return payload;
    }

    let {pageIndex} = payload;

    return {
      items: _.concat(
        _.slice(
          _.get(state, 'items', []), 0, pageIndex * 50
        ),
        _.get(action.payload, 'items', [])
      )
    };
  }
}, {
  loading: true
});

export default rankings