import {createAction} from 'redux-actions'
import {API_ROOT} from '../config'

export const FETCH_ORGANS = Symbol('FETCH');
export const fetchOrgans = ()=>createAction(FETCH_ORGANS)(`${API_ROOT}student/organs.json`);

export const FETCH_USER_RANKINGS = Symbol('FETCH');
export const fetchUserRankings = ()=>createAction(FETCH_USER_RANKINGS)(`${API_ROOT}students/users_rankings.json`);