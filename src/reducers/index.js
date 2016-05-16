import {combineReducers} from 'redux';
import {organs} from './organs';
import rankings from './rankings'
import books from './books'
import student from './student'

export default combineReducers({
  organs,
  rankings,
  books,
  student
});