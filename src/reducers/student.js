import {handleActions} from 'redux-actions'
import {FETCH_STUDENT} from '../actions'

export default handleActions({
  [FETCH_STUDENT]: (state, action)=> {
    let {payload} = action;

    if (payload instanceof Error) {
      return payload;
    }

    let studyDays = _.get(action.payload, 'studyDays');

    _.map(studyDays, item=> {
      item.studyDate = item.studyDate.replace(/\d{4}-(\d{2})-(\d{2})/, '$1.$2');
    });

    return action.payload;
  }
}, {});