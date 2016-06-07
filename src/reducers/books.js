import {handleActions} from 'redux-actions'
import _ from 'lodash'
import {FETCH_BOOKS} from '../actions'

export default handleActions({
  [FETCH_BOOKS]: (state, action)=> {
    let {payload} = action;

    if (payload instanceof Error) {
      return payload;
    }

    let result = [{
      "bookId": 0,
      "bookName": "全部词书"
    }];

    if (_.isArray(payload)) {
      result = _.concat(result, payload);
    }

    return result;
  }
}, []);