import React from 'react';
import Rx from 'rx'
import {createConnector} from 'redux-rx/react';
import './index.scss'
import {fetchOrgans} from '../../actions'
import Ranking from '../../components/Ranking'
import Message from '../../components/Message'

const {combineLatest} = Rx.Observable;

class Layout extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let {fetch} = this.props;

    return (
      <div className="layout">
        <header>
          <i className="hui-icon-carat-l"></i>
          <Ranking />
          <i className="hui-icon-user-solid"></i>
        </header>
        <section>
          {
            (fetch instanceof Error)
              ? <Message title='对不起' content={fetch.message}/>
              : this.props.children
          }
        </section>
      </div>
    )
  }
}

export default createConnector((props$, state$, dispatch$) => {

  let fetch$ = dispatch$.flatMap(dispatch=> dispatch(fetchOrgans()));

  return combineLatest(
    props$, state$, fetch$,
    (props, state, fetch)=> ({
      fetch,
      ...props,
      organs: state.organs
    })
  )
}, Layout);