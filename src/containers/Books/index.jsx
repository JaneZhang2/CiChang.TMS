import React from 'react'
import {createConnector} from 'redux-rx/react'
import './index.scss'
import {fetchOrgans,fetchBooks,fetchUserRankings} from '../../actions'

const {combineLatest} = Rx.Observable;

class Books extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)

    return (
      <div className="books">
        <header>
          <i className="hui-icon-carat-l"></i>
        </header>
        <section>
          <ul>
            <li>
              <div>
                <h2 className="title">全部词书</h2>
              </div>
              <i className="checked"/>
            </li>
            <li>
              <div>
                <h2 className="title">学英语绕不过的1000词</h2>
                <p className="description">进度<em>10%</em></p>
              </div>
              <i/>
            </li>
            <li>
              <div>
                <h2 className="title">全部词书</h2>
                <p></p>
              </div>
              <i/>
            </li>
            <li>
              <div>
                <h2 className="title">全部词书</h2>
                <p></p>
              </div>
              <i/>
            </li>
            <li>
              <div>
                <h2 className="title">全部词书</h2>
                <p></p>
              </div>
              <i/>
            </li>
            <li>
              <div>
                <h2 className="title">全部词书</h2>
                <p></p>
              </div>
              <i/>
            </li>
            <li>
              <div>
                <h2 className="title">全部词书</h2>
                <p></p>
              </div>
              <i/>
            </li>
          </ul>
          <button className="btn-primary">完成</button>
        </section>
      </div>
    )
  }
}

export default createConnector((props$, state$, dispatch$) => {

  let fetch$ = dispatch$.flatMap(dispatch=> dispatch(fetchBooks()));

  return combineLatest(
    props$, state$, fetch$,
    (props, state, fetch)=> ({
      fetch,
      ...props,
      books: state.books
    })
  )
}, Books);