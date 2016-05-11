import {createAction} from 'redux-actions'
import {API_ROOT} from '../config'

export const FETCH_ORGANS = Symbol('FETCH');
export const fetchOrgans = ()=>createAction(FETCH_ORGANS)(`${API_ROOT}student/organs.json`);