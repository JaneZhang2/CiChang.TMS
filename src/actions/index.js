import {createAction} from 'redux-actions'
import {API_ROOT} from '../config'
import URI from 'urijs'

export const FETCH_ORGANS = Symbol('FETCH');
export const fetchOrgans = ()=>createAction(FETCH_ORGANS)(`${API_ROOT}organs/30`);

export const FETCH_USER_RANKINGS = Symbol('FETCH');
export const fetchUserRankings = params=>createAction(FETCH_USER_RANKINGS)(
  String(new URI(`${API_ROOT}students/${params.category}_rankings`).query(params))
);

export const FETCH_BOOKS = Symbol('FETCH');
export const fetchBooks = id=>createAction(FETCH_BOOKS)(
  String(new URI(`${API_ROOT}students/${id}/mybooks`))
);

export const FETCH_STUDENT = Symbol('FETCH');
export const fetchStudent = params=>createAction(FETCH_STUDENT)(
  String(new URI(`${API_ROOT}students/${params.studentId}/home`).query(params))
);


// let aaa = {
//   "Message": "OK",
//   "Status": 0,
//   "Data": {
//     "orgName": "南昌一中",
//     "orgId": 30,
//     "parentOrgId": 0,
//     "orgType": 1,
//     "orgItems": [{
//       "orgName": "全部",
//       "orgId": 30,
//       "parentOrgId": 0,
//       "orgType": 0,
//       "orgItems": []
//     }, {
//       "orgName": "一年级",
//       "orgId": 32,
//       "parentOrgId": 30,
//       "orgType": 2,
//       "orgItems": [{
//         "orgName": "全部",
//         "orgId": 32,
//         "parentOrgId": 0,
//         "orgType": 0,
//         "orgItems": []
//       }, {
//         "orgName": "（1）班",
//         "orgId": 36,
//         "parentOrgId": 32,
//         "orgType": 3,
//         "orgItems": []
//       }, {
//         "orgName": "（2）班",
//         "orgId": 37,
//         "parentOrgId": 32,
//         "orgType": 3,
//         "orgItems": []
//       }]
//     }, {
//       "orgName": "二年级",
//       "orgId": 33,
//       "parentOrgId": 30,
//       "orgType": 2,
//       "orgItems": [{
//         "orgName": "全部",
//         "orgId": 33,
//         "parentOrgId": 0,
//         "orgType": 0,
//         "orgItems": []
//       }, {
//         "orgName": "（1）班",
//         "orgId": 38,
//         "parentOrgId": 33,
//         "orgType": 3,
//         "orgItems": []
//       }, {
//         "orgName": "（2）班",
//         "orgId": 39,
//         "parentOrgId": 33,
//         "orgType": 3,
//         "orgItems": []
//       }]
//     }, {
//       "orgName": "三年级",
//       "orgId": 34,
//       "parentOrgId": 30,
//       "orgType": 2,
//       "orgItems": [{
//         "orgName": "全部",
//         "orgId": 34,
//         "parentOrgId": 0,
//         "orgType": 0,
//         "orgItems": []
//       }, {
//         "orgName": "（1）班",
//         "orgId": 40,
//         "parentOrgId": 34,
//         "orgType": 3,
//         "orgItems": []
//       }]
//     }]
//   }
// }
