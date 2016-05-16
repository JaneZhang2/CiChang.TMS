import React from 'react'
import {createConnector} from 'redux-rx/react'
import {hashHistory} from 'react-router'
import './index.scss'
import {fetchBooks} from '../../actions'

const {combineLatest} = Rx.Observable;

class Books extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0
    }
  }

  onClick(id) {
    this.setState({
      current: id
    })
  }

  render() {
    let {current} = this.state;
    let {books} = this.props;

    return (
      <div className="books">
        <header>
          <i className="hui-icon-carat-l"/>
          <span>选择词书</span>
          <i className="hui-icon-user-solid"/>
        </header>
        <section>
          <ul className="list">
            {
              _.map(books, item=> {
                let {bookId, bookName} = item;

                return (
                  <li key={bookId} onClick={()=>this.onClick(bookId)}>
                    <div>
                      <h2 className="title">{bookName}</h2>
                      <p className="description">进度<em>10%</em></p>
                    </div>
                    <i
                      className={`radio ${current==bookId?'checked':''}`}/>
                  </li>
                )
              })
            }
          </ul>
          <button className="btn-primary"
                  onClick={()=>hashHistory.push(`students/111/${current}`)}>
            完成
          </button>
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