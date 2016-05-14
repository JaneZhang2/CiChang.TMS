import React from 'react';
import {createRxComponent, funcSubject} from 'react-rx-component';
import Rx from 'rx'
import _ from 'lodash';
import './index.scss';
import URI from 'urijs'
import {hashHistory} from 'react-router'
import DatePicker from '../DatePicker.jsx'
import {
  FILTER_ORGANS_TYPE,
  FILTER_SORT_TYPE,
  FILTER_DATE_TYPE,
  FILTER_DATE_PICKER_TYPE
} from '../../reducers/organs'

const {combineLatest} = Rx.Observable;

class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: []
    }
  }

  onClick(index, id) {
    let {current} = this.state;
    let {options, query} = this.props;
    let filters = _.get(options, 'entities.filters');

    current = _.set(current.slice(0, index), index, id);

    console.log('lll');
    console.log(query);

    // let uri = String(new URI('/')
    //   .query({
    //     schoolId: '',
    //     pageIndex: '',
    //     pageSize: ''
    //   }));
    //

    let data = _.get(filters, id);

    switch (_.get(data, 'type')) {
      case FILTER_ORGANS_TYPE:
        current.push(
          _.get(_.find(filters, {
            value: {
              gradeId: Number(_.get(query, 'gradeId'))
            }
          }), 'id'),
          _.get(_.find(filters, {
            value: {
              classId: Number(_.get(query, 'classId'))
            }
          }), 'id')
        );
        break;
      case FILTER_SORT_TYPE:
        current.push(
          _.get(_.find(filters, {
            value: {
              sortType: _.get(query, 'sortType')
            }
          }), 'id')
        );
        break;
      case FILTER_DATE_TYPE:
        current.push(
          _.get(_.find(filters, {
            value: {
              startDate: 'xxx',
              endDate: 'xxx'
            }
          }), 'id')
        );
        break;
    }

    this.setState({current});

    if (_.isEmpty(_.get(data, 'items'))) {
      _.map(current, id=>
        _.assign(query, _.get(filters, `${id}.value`))
      );

      this.setState({current: []});

      hashHistory.push(String(new URI('/').query(query)));
    }
  }

  render() {
    let {current} = this.state;
    let {options} = this.props;
    let filters = _.get(options, 'entities.filters');

    console.log(this.state);

    return (
      <div className={`filter-container ${current.length>0?'selecting':''}`}>
        <div className="filter">
          <ul>
            {
              _.map(
                _.get(options, 'result'),
                item => (
                  <li key={item} onClick={this.onClick.bind(this,0,item)}>
                    {_.get(filters, `${_.get(filters, `${item}.items[0]`)}.name`)}
                    <i className="hui-icon-carat-d-small"/>
                  </li>
                )
              )
            }
          </ul>
          {
            _.map(current, (id, index)=> {
              let data = _.get(filters, id);
              let items = _.get(data, 'items');

              if (_.isEmpty(items)) {
                return;
              }

              switch (_.get(data, 'type')) {
                case FILTER_DATE_PICKER_TYPE:
                  return (
                    <div className="range-picker-container">
                      <i className="hui-icon-clock-1"/>
                      <DatePicker/>
                      <i className="range-picker-separator"/>
                      <DatePicker/>
                      <i className="hui-icon-clock-1"/>
                      {
                        _.map(items, item =>
                          (
                            <button
                              className="range-picker-confirm"
                              onClick={this.onClick.bind(this,index+1,item)}
                            >
                              确定
                            </button>
                          )
                        )
                      }
                    </div>
                  );
                default:
                  return (
                    <ul key={id}>
                      {
                        _.map(items, item =>
                          (
                            <li
                              className={item==_.get(current,index+1)?'selected':''}
                              key={item}
                              onClick={this.onClick.bind(this,index+1,item)}
                            >
                              {_.get(filters, `${item}.name`)}
                            </li>
                          )
                        )
                      }
                    </ul>
                  )
              }
            })
          }
        </div>
      </div>
    )
  }
}

export default createRxComponent(props$ => {
  return combineLatest(
    props$,
    (props)=> ({
      ...props
    })
  )
}, Filter);