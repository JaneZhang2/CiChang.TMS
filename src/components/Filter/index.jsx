import React from 'react';
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
import 'rc-dialog/assets/bootstrap.css';
import Dialog from 'rc-dialog';
import uuid from 'node-uuid'

const yesterday = moment().hours(-24).format('YYYY-MM-DD');

class Filter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: uuid.v4(),
      last: [],
      current: []
    }
  }

  toggle(id) {
    this.props.toggleDialog(id);
  }

  onClose() {
    this.props.closeDialog();
  }

  onClick(index, id, fromState) {
    let {current, last} = this.state;
    let {options, query, params} = this.props;
    let filters = _.get(options, 'entities.filters');

    if (index == 0) {
      last = _.set(current.slice(0, index), index, id);
    }
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
          item=> {
            last.push(item);
            current.push(item);
          }
        );

        if (!_.get(current, '1') ||
          current[1] == _.get(_.find(filters, {id: current[0]}), 'items.0')) {
          current[1] = _.get(_.find(filters, {id}), 'items.1');
        }
        break;
      case FILTER_SORT_TYPE:
        current.push(
          _.get(_.find(filters, {
            value: {sortType: _.get(query, 'sortType', 'wordsDesc')}
          }), 'id')
        );
        last = _.clone(current);
        break;
      case FILTER_DATE_TYPE:
        current.push(
          _.get(_.find(filters, {
              value: {
                startDate: _.get(query, 'startDate', yesterday),
                endDate: _.get(query, 'endDate', yesterday)
              }
            }),
            'id',
            _.get(_.find(filters, {type: FILTER_DATE_PICKER_TYPE}), 'id')
          )
        );
        last = _.clone(current);
        break;
    }

    this.setState({current, last});

    if (_.isEmpty(_.get(metadata, 'items'))) {
      _.map(current, id=>
        _.assign(query, _.get(filters, `${id}.value`))
      );

      if (fromState === true) {
        _.assign(query, {
          startDate: moment(this.state.startDate).format('YYYY-MM-DD'),
          endDate: moment(this.state.endDate).format('YYYY-MM-DD')
        })
      }

      this.setState({
        last: current
      });

      setTimeout(()=> {
        this.onClose();
        hashHistory.push(
          String(new URI(`/rankings/${params.category}`).query(query))
        );
      }, 300);
    }
  }

  setStartDate(startDate) {
    if (moment(startDate).diff(moment(this.state.endDate)) > 0) {
      this.setState({endDate: startDate})
    }
    this.setState({startDate})
  }

  componentDidMount() {
    let {query} = this.props;

    this.setState({
      startDate: _.get(query, 'startDate', yesterday),
      endDate: _.get(query, 'endDate', yesterday)
    });
  }

  render() {
    let {last, current} = this.state;
    let {options, query, currentDialogId} = this.props;

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
      <div className="filter">
        <ul>
          {
            _.map(_.get(options, 'result'),
              id => {
                let selected = id == _.get(last, 0) && id == currentDialogId,
                  filter = _.get(filters, id),
                  name;

                switch (_.get(filter, 'type')) {
                  case FILTER_ORGANS_TYPE:
                    name = getOrganName(Number(_.get(query, 'orgId', _.get(filter, 'value.orgId'))));
                    name = name ? name : '全校';
                    break;
                  case FILTER_SORT_TYPE:
                    name = `${_.get(_.find(filters, {
                      value: {sortType: _.get(query, 'sortType', 'wordsDesc')}
                    }), 'name', '')}`;
                    break;
                  case FILTER_DATE_TYPE:
                    let startDate = _.get(query, 'startDate', yesterday),
                      endDate = _.get(query, 'endDate', yesterday),
                      result = _.find(filters, {value: {startDate, endDate}});

                    name = _.get(result, 'name',
                      `${startDate.replace(/\d{4}-(\d{2})-(\d{2})/, '$1.$2')}-
                         ${endDate.replace(/\d{4}-(\d{2})-(\d{2})/, '$1.$2')}`
                    );
                    break;
                }

                let dialogActive = id == currentDialogId;
                let dialog;
                if (dialogActive) {
                  dialog = <Dialog
                    wrapClassName="filter-dialog"
                    visible={dialogActive}
                    animation="slide-fade"
                    maskAnimation="fade"
                    onClose={this.onClose.bind(this)}
                  >
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
                                  date={this.state.startDate}
                                  onChange={startDate=>this.setStartDate(startDate)}
                                />
                                <i className="range-picker-separator"/>
                                <DatePicker
                                  minDate={this.state.startDate}
                                  date={this.state.endDate}
                                  onChange={endDate=>this.setState({endDate})}
                                />
                                <i className="hui-icon-clock-1"/>
                                {
                                  _.map(items, item =>
                                    (
                                      <button
                                        className="range-picker-confirm"
                                        onClick={this.onClick.bind(this,index+1,item,true)}
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
                                      let lastSelected = item == _.get(last, index + 1);
                                      if (!_.get(last, index + 1)) {
                                        lastSelected = item == _.get(filters, `${_.get(last, index)}.items.0`)
                                      }
                                      let selected = item == _.get(current, index + 1);
                                      if (!_.get(current, index + 1)) {
                                        selected = _.get(filters, `${_.get(current, index)}.value.orgId`)
                                          == _.get(filters, `${item}.value.orgId`)
                                      }

                                      return (
                                        <li
                                          className={`${selected?'selected':''} ${lastSelected?'lastSelected':''}`}
                                          key={item}
                                          onClick={this.onClick.bind(this,index+1,item)}
                                        >
                                          {_.get(filters, `${item}.name`)}
                                          {
                                            lastSelected ? <i
                                              className="hui-icon-checked-small"/> : ''
                                          }
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
                  </Dialog>
                }

                return (
                  <li className={selected?'selected':''}
                      key={id} onClick={()=>{
                        this.toggle(id);
                        this.onClick(0,id)
                      }}>
                    {name}
                    {dialog}
                    <i
                      className={`hui-icon-carat-${selected?'u':'d'}-small`}/>
                  </li>
                )
              })
          }
        </ul>
      </div>
    )
  }
}

export default Filter