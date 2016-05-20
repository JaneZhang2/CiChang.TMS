import React from 'react'
import {createRxComponent, funcSubject} from 'react-rx-component'
import Rx from 'rx'
import './index.scss'
import {hashHistory} from 'react-router'

const {combineLatest} = Rx.Observable;

class Ranking extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let {toggle, active} = this.props;
    let type = _.get(this.props, 'params.type');

    return (
      <div className="ranking-container">
        <div onClick={toggle}>排名-人<i className="hui-icon-carat-d-small"></i>
        </div>
        {
          active ? <div className="ranking-modal">
            <div className="arrow"></div>
            <ul>
              <li className={type=='users'?'active':''}
                  onClick={()=>toggle(hashHistory.push('/rankings/users'))}>
                排名-人
                {
                  type == 'users' ?
                    <i className="hui-icon-checked-small"></i> : ''
                }
              </li>
              <li className={type=='class'?'active':''}
                  onClick={()=>toggle(hashHistory.push('/rankings/class'))}>
                排名-班级
                {
                  type == 'class' ?
                    <i className="hui-icon-checked-small"></i> : ''
                }
              </li>
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