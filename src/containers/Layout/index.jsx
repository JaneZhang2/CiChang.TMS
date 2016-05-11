import React from 'react';
import {hashHistory} from 'react-router'
import {createRxComponent, funcSubject} from 'react-rx-component'
import Rx from 'rx'
import 'isomorphic-fetch'
import CONFIG from '../../config'
import './index.scss'
import Ranking from '../../components/Ranking'
import URI from 'urijs'

const {combineLatest, fromPromise} = Rx.Observable;

class Layout extends React.Component {

  constructor(props) {
    super(props)
  }

  //http://dev.cichang.hjapi.com/teacher/v1/students/users_rankings/


  render() {
    return (
      <div className="layout">
        <header>
          <i className="hui-icon-carat-l"></i>
          <Ranking />
          <i className="hui-icon-user-solid"></i>
        </header>
        <section>
          {this.props.children}
        </section>
      </div>
    )
  }
}

export default createRxComponent(props$ => {
  let fetch$ = fromPromise(
    fetch(`${CONFIG.API_ROOT}student/organs.json`)
  )
    .flatMap(response=>response.json())
    .map(result=> {
      let {status, message, data} = result;

      switch (status) {
        case -8193:
          return console.log(
            URI("//qapass.hujiang.com/m")
              .query({
                url: 'http://localhost:8080',
                source: 'cichang',
                skips: ['category-select', 'interest-select', 'register-success'],
                plain_login: true,
                plain_register: true
              })
          );
        case 0:
          return data;
        default:
          throw new Error(message);
      }
    })
    .catch(error=> Rx.Observable.return(error));

  return combineLatest(
    props$, fetch$,
    (props)=> ({...props})
  )
}, Layout);