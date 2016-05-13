import {handleActions} from 'redux-actions'
import {normalize, Schema, arrayOf} from 'normalizr';
import {FETCH_ORGANS} from '../actions'

const schema = new Schema('organs', {idAttribute: 'orgId'});
schema.define({orgItems: arrayOf(schema)});

const organs = handleActions({
  [FETCH_ORGANS]: (state, action)=> normalize(action.payload, schema)
}, {});

export default organs