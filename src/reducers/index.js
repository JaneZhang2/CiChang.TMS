import {combineReducers} from 'redux';
import {organs} from './organs';
import rankings from './rankings'

export default combineReducers({
  organs,
  rankings
});