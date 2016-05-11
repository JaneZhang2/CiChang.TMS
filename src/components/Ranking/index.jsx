import React from 'react'
import {createRxComponent, funcSubject} from 'react-rx-component'
import Rx from 'rx'
import './index.scss'

const {combineLatest} = Rx.Observable;

class Ranking extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let {toggle, active} = this.props;

    return (
      <div className="ranking-container">
        <div onClick={toggle}>排名-人<i className="hui-icon-carat-d-small"></i>
        </div>
        {
          active ? <div className="ranking-modal">
            <div className="arrow"></div>
            <ul>
              <li className="active">
                排名-人<i className="hui-icon-checked-small"></i>
              </li>
              <li>排名-班级</li>
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