import {handleActions} from 'redux-actions'
import {normalize, Schema, arrayOf} from 'normalizr'
import uuid from 'node-uuid'
import {FETCH_ORGANS_BY_USERS, FETCH_ORGANS_BY_CLASS} from '../actions'
import moment from 'moment'
import _ from 'lodash'

export const FILTER_ORGANS_TYPE = Symbol();
export const FILTER_SORT_TYPE = Symbol();
export const FILTER_DATE_TYPE = Symbol();
export const FILTER_DATE_PICKER_TYPE = Symbol();

const schema = new Schema('filters');
schema.define({items: arrayOf(schema)});

const formatter = (items, limit)=>
  _.map(items, item=> ({
    id: uuid.v4(),
    name: item.orgName,
    items: item.orgType == limit ? [] : formatter(item.orgItems, limit),
    value: {orgId: item.orgId},
    parentOrgId: item.orgType == 2 ? 0 : item.parentOrgId
  }));

export const organs = handleActions({
  [FETCH_ORGANS_BY_USERS]: (state, action)=> {
    let {payload} = action;

    if (payload instanceof Error) {
      return payload;
    }

    let filters = [
      {
        id: uuid.v4(),
        type: FILTER_ORGANS_TYPE,
        items: formatter(
          _.get(payload, 'orgItems'), 3
        )
      },
      {
        id: uuid.v4(),
        type: FILTER_SORT_TYPE,
        items: [
          {
            id: uuid.v4(),
            name: '单词最多',
            value: {sortType: 'wordsDesc'}
          },
          {
            id: uuid.v4(),
            name: '单词最少',
            value: {sortType: 'wordsAsc'}
          }
        ]
      },
      {
        id: uuid.v4(),
        type: FILTER_DATE_TYPE,
        items: [
          {
            id: uuid.v4(),
            name: '昨日',
            value: {
              startDate: moment().hours(-24).format('YYYY-MM-DD'),
              endDate: moment().hours(-24).format('YYYY-MM-DD')
            }
          },
          {
            id: uuid.v4(),
            name: '今日',
            value: {
              startDate: moment().format('YYYY-MM-DD'),
              endDate: moment().format('YYYY-MM-DD')
            }
          },
          {
            id: uuid.v4(),
            type: FILTER_DATE_PICKER_TYPE,
            name: '自选',
            items: [
              {
                id: uuid.v4()
              }
            ]
          }
        ]
      }
    ];

    return normalize(filters, arrayOf(schema));
  },
  [FETCH_ORGANS_BY_CLASS]: (state, action)=> {
    let {payload} = action;

    if (payload instanceof Error) {
      return payload;
    }

    let filters = [
      {
        id: uuid.v4(),
        type: FILTER_ORGANS_TYPE,
        items: formatter(
          _.get(payload, 'orgItems'), 2
        )
      },
      {
        id: uuid.v4(),
        type: FILTER_SORT_TYPE,
        items: [
          {
            id: uuid.v4(),
            name: '单词最多',
            value: {sortType: 'wordsDesc'}
          },
          {
            id: uuid.v4(),
            name: '单词最少',
            value: {sortType: 'wordsAsc'}
          },
          {
            id: uuid.v4(),
            name: '天数最多',
            value: {sortType: 'daysDesc'}
          },
          {
            id: uuid.v4(),
            name: '天数最少',
            value: {sortType: 'daysAsc'}
          }
        ]
      },
      {
        id: uuid.v4(),
        type: FILTER_DATE_TYPE,
        items: [
          {
            id: uuid.v4(),
            name: '昨日',
            value: {
              startDate: moment().hours(-24).format('YYYY-MM-DD'),
              endDate: moment().hours(-24).format('YYYY-MM-DD')
            }
          },
          {
            id: uuid.v4(),
            name: '今日',
            value: {
              startDate: moment().format('YYYY-MM-DD'),
              endDate: moment().format('YYYY-MM-DD')
            }
          },
          {
            id: uuid.v4(),
            type: FILTER_DATE_PICKER_TYPE,
            name: '自选',
            items: [
              {
                id: uuid.v4()
              }
            ]
          }
        ]
      }
    ];

    return normalize(filters, arrayOf(schema));
  }
}, {});