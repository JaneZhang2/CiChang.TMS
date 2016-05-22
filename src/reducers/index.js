import {combineReducers} from 'redux';
import id from './id'
import {organs} from './organs';
import rankings from './rankings'
import books from './books'
import student from './student'

export default combineReducers({
  id,
  organs,
  rankings,
  books,
  student
});