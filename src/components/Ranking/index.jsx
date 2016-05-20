import React from 'react'
import {createRxComponent, funcSubject} from 'react-rx-component'
import Rx from 'rx'
import './index.scss'
import {hashHistory} from 'react-router'

const {combineLatest} = Rx.Observable;

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
    super(props)
  }

  render() {
    let {params, toggle, active} = this.props;
    let category = _.get(params, 'category');

    return (
      <div className="ranking-container">
        <div onClick={toggle}>
          {_.get(_.find(options, {key: category}), 'text')}
          <i className="hui-icon-carat-d-small"/>
        </div>
        {
          active ? <div className="ranking-modal">
            <div className="arrow"></div>
            <ul>
              {
                _.map(options, option=> {
                  let {key} = option,
                    selected = category == key;

                  return (
                    <li
                      key={key}
                      className={selected?'active':''}
                      onClick={()=>toggle(hashHistory.push(`/rankings/${key}`))}
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
          </div> : ''
        }
      </div>
    )
  }
}

export default createRxComponent(props$ => {
  const toggle$ = funcSubject();
  const active$ = toggle$.startWith(false).scan(active=>!active);

  return combineLatest(
    props$, active$,
    (props, active)=> ({...props, active, toggle: toggle$})
  )
}, Ranking);