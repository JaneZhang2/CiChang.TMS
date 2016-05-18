import {handleActions} from 'redux-actions'
import {normalize, Schema, arrayOf} from 'normalizr'
import shortid from 'shortid'
import {FETCH_ORGANS} from '../actions'
import moment from 'moment'

export const FILTER_ORGANS_TYPE = Symbol();
export const FILTER_SORT_TYPE = Symbol();
export const FILTER_DATE_TYPE = Symbol();
export const FILTER_DATE_PICKER_TYPE = Symbol();


// const schema = new Schema('organs', {idAttribute: 'orgId'});
// schema.define({orgItems: arrayOf(schema)});

const schema = new Schema('filters');
schema.define({items: arrayOf(schema)});

const filters = [
  {
    id: shortid.generate(),
    type: FILTER_ORGANS_TYPE,
    items: [
      {
        id: shortid.generate(),
        name: '全校',
        value: {organId: 0}
      },
      {
        id: shortid.generate(),
        name: '一年级',
        value: {organId: 2},
        items: [
          {
            id: shortid.generate(),
            name: '全部',
            value: {
              organId: 0,
              parentOrgId: 2
            }
          },
          {
            id: shortid.generate(),
            name: '1班',
            value: {
              organId: 16,
              parentOrgId: 2
            }
          },
          {
            id: shortid.generate(),
            name: '2班',
            value: {
              organId: 17,
              parentOrgId: 2
            }
          },
          {
            id: shortid.generate(),
            name: '3班',
            value: {
              organId: 18,
              parentOrgId: 2
            }
          },
          {
            id: shortid.generate(),
            name: '4班',
            value: {
              organId: 19,
              parentOrgId: 2
            }
          },
          {
            id: shortid.generate(),
            name: '5班',
            value: {
              organId: 20,
              parentOrgId: 2
            }
          },
          {
            id: shortid.generate(),
            name: '6班',
            value: {
              organId: 21,
              parentOrgId: 2
            }
          },
          {
            id: shortid.generate(),
            name: '7班',
            value: {
              organId: 22,
              parentOrgId: 2
            }
          }
        ]
      },
      {
        id: shortid.generate(),
        name: '二年级',
        value: {organId: 3}
      },
      {
        id: shortid.generate(),
        name: '三年级',
        value: {organId: 4}
      },
      {
        id: shortid.generate(),
        name: '四年级',
        value: {organId: 5}
      },
      {
        id: shortid.generate(),
        name: '五年级',
        value: {organId: 6}
      },
      {
        id: shortid.generate(),
        name: '六年级',
        value: {organId: 7}
      }
    ]
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

export const organs = handleActions({
  [FETCH_ORGANS]: (state, action)=> {
    return normalize(filters, arrayOf(schema));
  }
}, {});