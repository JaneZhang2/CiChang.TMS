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
        value: {gradeId: 0}
      },
      {
        id: shortid.generate(),
        name: '一年级',
        value: {gradeId: 2},
        items: [
          {
            id: shortid.generate(),
            name: '全部',
            value: {classId: 0}
          },
          {
            id: shortid.generate(),
            name: '1班',
            value: {classId: 16}
          },
          {
            id: shortid.generate(),
            name: '2班',
            value: {classId: 17}
          },
          {
            id: shortid.generate(),
            name: '3班',
            key: 'classId',
            value: 18
          },
          {
            id: shortid.generate(),
            name: '4班',
            value: {classId: 18}
          },
          {
            id: shortid.generate(),
            name: '5班',
            value: {classId: 19}
          },
          {
            id: shortid.generate(),
            name: '6班',
            value: {classId: 20}
          },
          {
            id: shortid.generate(),
            name: '7班',
            value: {classId: 21}
          }
        ]
      },
      {
        id: shortid.generate(),
        name: '二年级',
        value: {gradeId: 3}
      },
      {
        id: shortid.generate(),
        name: '三年级',
        value: {gradeId: 4}
      },
      {
        id: shortid.generate(),
        name: '四年级',
        value: {gradeId: 5}
      },
      {
        id: shortid.generate(),
        name: '五年级',
        value: {gradeId: 6}
      },
      {
        id: shortid.generate(),
        name: '六年级',
        value: {gradeId: 7}
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
            id: shortid.generate(),
            value: {startDate: 'xxx', endDate: 'xxx'}
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