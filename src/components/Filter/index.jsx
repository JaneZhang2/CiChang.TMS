import React from 'react';
import {createRxComponent, funcSubject} from 'react-rx-component';
import Rx from 'rx'
import {normalize, Schema, arrayOf} from 'normalizr';
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
    this.setState({
      current: _.setWith(this.state.current, index, id)
    })
  }

  render() {
    let {defaultValue, options, trigger} = this.props;

    const filters = [{
      id: '',
      items: ''
    }];

    console.log(this.state)

    let organs = _.get(options, 'entities.organs');

    return (
      <div className="filter">
        <div onClick={this.onClick.bind(this,0,1)}>
          {defaultValue}<i className="hui-icon-carat-d-small"/>
        </div>
        <div className="items-contaniner">
          {
            _.map(this.state.current, (item, index)=> {
              let list = _.pick(organs, _.get(organs, `${item}.orgItems`));

              return _.isEmpty(list) ? '' :
                <ul>
                  {
                    _.map(list, item=>(
                        <li
                          className={this.state.current[index+1]==item.orgId?'xxx':''}
                          onClick={this.onClick.bind(this,index+1,item.orgId)}
                          key={item.orgId}>{item.orgName}</li>
                      )
                    )
                  }
                </ul>
            })
          }
        </div>
      </div>
    )
  }
}

// <div className="xxx">
//   <ul className={active?'active':''}>
//     <li>昨日</li>
//     <li>今日</li>
//     <li>
//       自选
//       <div className="range-picker-container">
//         <div className="range-picker">
//           <i className="hui-icon-clock-1"></i>
//           <DatePicker/>
//           <i className="range-picker-separator"></i>
//           <DatePicker/>
//           <i className="hui-icon-clock-1"></i>
//         </div>
//         <button className="range-picker-confirm" href="">确定</button>
//       </div>
//     </li>
//   </ul>
// </div>

// <i className="hui-icon-clock-1"></i>
// <DatePicker></DatePicker>
// <i className="divider"></i>
//   <DatePicker></DatePicker>

// <div>
//   <ul className={active?'active':''}>
//     <li>全校</li>
//     <li>一年级</li>
//   </ul>
//   <ul>
//     <li>全部</li>
//     <li>1班</li>
//     <li>2班</li>
//     <li>3班</li>
//     <li>4班</li>
//     <li>5班</li>
//   </ul>
// </div>

export default createRxComponent(props$ => {
  return combineLatest(
    props$,
    (props)=> ({
      ...props
    })
  )
}, Filter);

// export default Filter;