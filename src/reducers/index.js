import {combineReducers} from 'redux';
import {organs} from './organs';
import rankings from './rankings'
import books from './books'

export default combineReducers({
  organs,
  rankings,
  books
});