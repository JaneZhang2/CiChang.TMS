import React from 'react'
import {hashHistory} from 'react-router'
import './index.scss'
import mui from '../MUI/js/mui'

const options = [
  {
    key: 'users',
    text: '排名-人'
  },
  {
    key: 'class',
    text: '排名-班级'
  }
];

class Ranking extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {params} = this.props;
    let category = _.get(params, 'category');

    return (
      <div className="ranking-container">
        <a href="#topPopover" onClick={(e)=>e.preventDefault()}>
          {_.get(_.find(options, {key: category}), 'text')}
          <i className="hui-icon-carat-d-small"/>
        </a>
        <div id="topPopover" className="mui-popover">
          <div className="mui-popover-arrow"></div>
          <div className="mui-scroll-wrapper">
            <div className="mui-scroll">
              <ul className="mui-table-view">
                {
                  _.map(options, option=> {
                    let {key} = option,
                      selected = category == key;

                    return (
                      <li
                        key={key}
                        className={'mui-table-view-cell '+ selected?'active':''}
                        onClick={()=>{
                              mui('#topPopover').popover('toggle');
                              hashHistory.push(`/rankings/${key}`);
                            }}
                      >
                        {option.text}
                        {
                          selected
                            ? <i className="hui-icon-checked-small"></i>
                            : ''
                        }
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Ranking;