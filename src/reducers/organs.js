import {handleActions} from 'redux-actions'
import {normalize, Schema, arrayOf} from 'normalizr'
import shortid from 'shortid'
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
    id: shortid.generate(),
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
        id: shortid.generate(),
        type: FILTER_ORGANS_TYPE,
        items: formatter(
          _.get(payload, 'orgItems'), 3
        )
      },
      {
        id: shortid.generate(),
        type: FILTER_SORT_TYPE,
        items: [
          {
            id: shortid.generate(),
            name: '单词最多',
            value: {sortType: 'wordsDesc'}
          },
          {
            id: shortid.generate(),
            name: '单词最少',
            value: {sortType: 'wordsAsc'}
          }
        ]
      },
      {
        id: shortid.generate(),
        type: FILTER_DATE_TYPE,
        items: [
          {
            id: shortid.generate(),
            name: '昨日',
            value: {
              startDate: moment().hours(-24).format('YYYY-MM-DD'),
              endDate: moment().hours(-24).format('YYYY-MM-DD')
            }
          },
          {
            id: shortid.generate(),
            name: '今日',
            value: {
              startDate: moment().format('YYYY-MM-DD'),
              endDate: moment().format('YYYY-MM-DD')
            }
          },
          {
            id: shortid.generate(),
            type: FILTER_DATE_PICKER_TYPE,
            name: '自选',
            items: [
              {
                id: shortid.generate()
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
        id: shortid.generate(),
        type: FILTER_ORGANS_TYPE,
        items: formatter(
          _.get(payload, 'orgItems'), 2
        )
      },
      {
        id: shortid.generate(),
        type: FILTER_SORT_TYPE,
        items: [
          {
            id: shortid.generate(),
            name: '单词最多',
            value: {sortType: 'wordsDesc'}
          },
          {
            id: shortid.generate(),
            name: '单词最少',
            value: {sortType: 'wordsAsc'}
          },
          {
            id: shortid.generate(),
            name: '天数最多',
            value: {sortType: 'daysDesc'}
          },
          {
            id: shortid.generate(),
            name: '天数最少',
            value: {sortType: 'daysAsc'}
          }
        ]
      },
      {
        id: shortid.generate(),
        type: FILTER_DATE_TYPE,
        items: [
          {
            id: shortid.generate(),
            name: '昨日',
            value: {
              startDate: moment().hours(-24).format('YYYY-MM-DD'),
              endDate: moment().hours(-24).format('YYYY-MM-DD')
            }
          },
          {
            id: shortid.generate(),
            name: '今日',
            value: {
              startDate: moment().format('YYYY-MM-DD'),
              endDate: moment().format('YYYY-MM-DD')
            }
          },
          {
            id: shortid.generate(),
            type: FILTER_DATE_PICKER_TYPE,
            name: '自选',
            items: [
              {
                id: shortid.generate()
              }
            ]
          }
        ]
      }
    ];

    return normalize(filters, arrayOf(schema));
  }
}, {});