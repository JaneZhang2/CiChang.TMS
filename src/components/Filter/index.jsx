import React from 'react';
import _ from 'lodash';
import './index.scss';
import DatePicker from '../DatePicker.jsx'

class Filter extends React.Component {

  constructor(props) {
    super(props)
  }

  trigger() {
    let self = this;
  }

  render() {
    let {active, defaultValue, options, trigger} = this.props;

    return (
      <div className="filter">
        <span onClick={()=>trigger()}>
          {defaultValue}<i className="hui-icon-carat-d-small"/>
        </span>
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

export default Filter;