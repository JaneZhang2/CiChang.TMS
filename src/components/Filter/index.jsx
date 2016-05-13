import React from 'react';
import {createRxComponent, funcSubject} from 'react-rx-component';
import Rx from 'rx'
import _ from 'lodash';
import './index.scss';
import DatePicker from '../DatePicker.jsx'

const {combineLatest} = Rx.Observable;

class Filter extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      current: []
    }
  }

  trigger() {
    let self = this;
  }

  onClick(index, id) {
    let {current} = this.state;

    this.setState({
      current: _.set(current.slice(0, index), index, id)
    })
  }

  render() {
    let {current} = this.state;
    let {options} = this.props;
    let filters = _.get(options, 'entities.filters');

    return (
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
          _.map(current, (id, index)=>
            ((items)=> _.isEmpty(items) ? '' :
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
              </ul>)
            (_.get(filters, `${id}.items`))
          )
        }
        {
          _.last(current) == 14 ?
            <div className="range-picker-container">
              <i className="hui-icon-clock-1"></i>
              <DatePicker/>
              <i className="range-picker-separator"></i>
              <DatePicker/>
              <i className="hui-icon-clock-1"></i>
              <button className="range-picker-confirm">
                确定
              </button>
            </div> : ''
        }
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