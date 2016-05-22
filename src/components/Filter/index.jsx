import React from 'react';
import {createRxComponent} from 'react-rx-component';
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
import moment from 'moment'

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

    let metadata = _.get(filters, id);

    let getId = id=> {
      let result = _.find(filters, {value: {orgId: id}});
      let name = _.get(result, 'id', '');
      let parentOrgId = Number(_.get(result, 'parentOrgId'));

      return parentOrgId
        ? `${getId(parentOrgId)},${name}`
        : name;
    };

    switch (_.get(metadata, 'type')) {
      case FILTER_ORGANS_TYPE:
        _.map(
          getId(Number(_.get(query, 'orgId'))).split(','),
          item=>current.push(item)
        );
        break;
      case FILTER_SORT_TYPE:
        current.push(
          _.get(_.find(filters, {
            value: {sortType: _.get(query, 'sortType', 'wordsDesc')}
          }), 'id')
        );
        break;
      case FILTER_DATE_TYPE:
        current.push(
          _.get(_.find(filters, {
              value: {
                startDate: _.get(query, 'startDate', moment().hours(-24).format('YYYY-MM-DD')),
                endDate: _.get(query, 'endDate', moment().hours(-24).format('YYYY-MM-DD'))
              }
            }),
            'id',
            _.get(_.find(filters, {type: FILTER_DATE_PICKER_TYPE}), 'id')
          )
        );
        break;
    }

    this.setState({current});

    if (_.isEmpty(_.get(metadata, 'items'))) {
      _.map(current, id=>
        _.assign(query, _.get(filters, `${id}.value`))
      );

      this.setState({current: []});

      hashHistory.push(
        String(new URI('/').query({
          ...query
          // startDate: moment(this.state.startDate).format('YYYY-MM-DD'),
          // endDate: moment(this.state.endDate).format('YYYY-MM-DD')
        }))
      );
    }
  }

  render() {
    console.log('render')
    console.log(this.state.current)

    let {current} = this.state;
    let {options, query} = this.props;
    let filters = _.get(options, 'entities.filters');
    let getOrganName = id=> {
      let result = _.find(filters, {value: {orgId: id}});
      let name = _.get(result, 'name', '');
      let parentOrgId = Number(_.get(result, 'parentOrgId'));

      return parentOrgId
        ? `${getOrganName(parentOrgId)}${name}`
        : name;
    };

    return (
      <div className={current.length > 0?'filter-container':''}>
        <div className="filter">
          <ul>
            {
              _.map(_.get(options, 'result'),
                id => {
                  let selected = id == _.get(current, 0),
                    filter = _.get(filters, id),
                    name;

                  switch (_.get(filter, 'type')) {
                    case FILTER_ORGANS_TYPE:
                      name = getOrganName(Number(_.get(query, 'orgId', _.get(filter, 'value.orgId'))));
                      name = name ? name : '全部';
                      break;
                    case FILTER_SORT_TYPE:
                      name = `${_.get(_.find(filters, {
                        value: {sortType: _.get(query, 'sortType', 'wordsDesc')}
                      }), 'name', '')}`;
                      break;
                    case FILTER_DATE_TYPE:
                      let startDate = _.get(query, 'startDate', moment().hours(-24).format('YYYY-MM-DD')),
                        endDate = _.get(query, 'endDate', moment().hours(-24).format('YYYY-MM-DD')),
                        result = _.find(filters, {value: {startDate, endDate}});

                      name = _.get(result, 'name',
                        `${startDate.replace(/\d{4}-(\d{2})-(\d{2})/, '$1.$2')}-
                         ${endDate.replace(/\d{4}-(\d{2})-(\d{2})/, '$1.$2')}`
                      );
                      break;
                  }

                  return (
                    <li className={selected?'selected':''}
                        key={id} onClick={this.onClick.bind(this,0,id)}>
                      {name}
                      <i
                        className={`hui-icon-carat-${selected?'u':'d'}-small`}/>
                    </li>
                  )
                })
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
                      <DatePicker
                        defaultDate={moment(_.get(query, 'startDate')).format('YYYY.MM.DD')}
                        onChange={startDate=>this.setState({startDate})}
                      />
                      <i className="range-picker-separator"/>
                      <DatePicker
                        defaultDate={moment(_.get(query, 'endDate')).format('YYYY.MM.DD')}
                        onChange={endDate=>this.setState({endDate})}
                      />
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
                        _.map(items, item => {
                            let selected = item == _.get(current, index + 1);
                            if (!_.get(current, index + 1)) {
                              selected = _.get(filters, `${_.get(current, index)}.value.orgId`)
                                == _.get(filters, `${item}.value.orgId`)
                            }

                            return (
                              <li
                                className={selected?'selected':''}
                                key={item}
                                onClick={this.onClick.bind(this,index+1,item)}
                              >
                                {_.get(filters, `${item}.name`)}
                              </li>
                            )
                          }
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