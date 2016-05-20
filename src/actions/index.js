import {createAction} from 'redux-actions'
import {API_ROOT} from '../config'
import URI from 'urijs'

export const FETCH_ORGANS = Symbol('FETCH');
export const fetchOrgans = ()=>createAction(FETCH_ORGANS)(`${API_ROOT}organs/30`);

export const FETCH_USER_RANKINGS = Symbol('FETCH');
export const fetchUserRankings = params=>createAction(FETCH_USER_RANKINGS)(
  String(new URI(`${API_ROOT}students/users_rankings`).query(params))
);

export const FETCH_BOOKS = Symbol('FETCH');
export const fetchBooks = ()=>createAction(FETCH_BOOKS)(`${API_ROOT}books.json`);

//http://dev.mci.hujiang.com/teacher/v1/students/{userId:int}/mybooks/


export const FETCH_STUDENT = Symbol('FETCH');
export const fetchStudent = params=>createAction(FETCH_STUDENT)(
  String(new URI(`${API_ROOT}students/${params.studentId}/home`).query(params))
);
