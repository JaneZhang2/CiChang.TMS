import {handleActions} from 'redux-actions'
import {normalize, Schema, arrayOf} from 'normalizr';
import {FETCH_ORGANS} from '../actions'

// const schema = new Schema('organs', {idAttribute: 'orgId'});
// schema.define({orgItems: arrayOf(schema)});

const schema = new Schema('filters');
schema.define({items: arrayOf(schema)});

const organs = handleActions({
  [FETCH_ORGANS]: (state, action)=> {

    const filters = [
      {
        id: 0,
        name: '',
        items: [
          {
            id: 1,
            name: '全校'
          },
          {
            id: 2,
            name: '一年级',
            items: [
              {
                id: 15,
                name: '全校'
              },
              {
                id: 16,
                name: '1班'
              },
              {
                id: 17,
                name: '2班'
              },
              {
                id: 18,
                name: '3班'
              },
              {
                id: 19,
                name: '4班'
              },
              {
                id: 20,
                name: '5班'
              },
              {
                id: 21,
                name: '6班'
              },
              {
                id: 22,
                name: '7班'
              }
            ]
          },
          {
            id: 3,
            name: '二年级'
          },
          {
            id: 4,
            name: '三年级'
          },
          {
            id: 5,
            name: '四年级'
          },
          {
            id: 6,
            name: '五年级'
          },
          {
            id: 7,
            name: '六年级'
          }
        ]
      },
      {
        id: 8,
        name: '',
        items: [
          {
            id: 9,
            name: '单词最多'
          },
          {
            id: 10,
            name: '单词最少'
          }
        ]
      },
      {
        id: 11,
        name: '',
        items: [
          {
            id: 12,
            name: '昨日'
          },
          {
            id: 13,
            name: '今日'
          },
          {
            id: 14,
            name: '自选'
          }
        ]
      }
    ];

    return normalize(filters, arrayOf(schema));
  }
}, {});

export default organs