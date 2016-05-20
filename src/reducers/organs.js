import {handleActions} from 'redux-actions'
import {normalize, Schema, arrayOf} from 'normalizr'
import shortid from 'shortid'
import {FETCH_ORGANS} from '../actions'
import moment from 'moment'
import _ from 'lodash'

export const FILTER_ORGANS_TYPE = Symbol();
export const FILTER_SORT_TYPE = Symbol();
export const FILTER_DATE_TYPE = Symbol();
export const FILTER_DATE_PICKER_TYPE = Symbol();


// const schema = new Schema('organs', {idAttribute: 'orgId'});
// schema.define({orgItems: arrayOf(schema)});

const schema = new Schema('filters');
schema.define({items: arrayOf(schema)});

const formatter = items=>
  _.map(items, item=> ({
    id: shortid.generate(),
    name: item.orgName,
    items: formatter(item.orgItems),
    value: {orgId: item.orgId},
    parentOrgId: item.orgType == 2 ? 0 : item.parentOrgId
  }));

export const organs = handleActions({
  [FETCH_ORGANS]: (state, action)=> {

    let filters = [
      {
        id: shortid.generate(),
        type: FILTER_ORGANS_TYPE,
        items: formatter(
          _.get(action.payload, 'orgItems')
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
              startDate: moment().day(-1).format('YYYY-MM-DD'),
              endDate: moment().day(-1).format('YYYY-MM-DD')
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