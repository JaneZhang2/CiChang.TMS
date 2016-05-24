import {createAction} from 'redux-actions'
import URI from 'urijs'
import config from '../config'

export const FETCH_ORGANS = Symbol('FETCH');
export const fetchOrgans = ()=>createAction(FETCH_ORGANS)(`${config.API_ROOT}organs/30`);

export const FETCH_USER_RANKINGS = Symbol('FETCH');
export const fetchUserRankings = params=>createAction(FETCH_USER_RANKINGS)(
  String(new URI(`${config.API_ROOT}students/${params.category}_rankings`).query(params))
);

export const FETCH_BOOKS = Symbol('FETCH');
export const fetchBooks = id=>createAction(FETCH_BOOKS)(
  String(new URI(`${config.API_ROOT}students/${id}/mybooks`))
);

export const FETCH_STUDENT = Symbol('FETCH');
export const fetchStudent = params=>createAction(FETCH_STUDENT)(
  String(new URI(`${config.API_ROOT}students/${params.studentId}/home`).query(params))
);
