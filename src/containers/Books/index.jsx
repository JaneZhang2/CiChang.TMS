import React from 'react'
import {createConnector} from 'redux-rx/react'
import {bindActionCreators} from 'redux-rx';
import {hashHistory} from 'react-router'
import './index.scss'
import {fetchBooks} from '../../actions'

const {combineLatest} = Rx.Observable;

class Books extends React.Component {

  constructor(props) {
    super(props);
  }

  onClick(id) {
    this.setState({
      current: id
    })
  }

  render() {
    let {books, params, location} = this.props;
    let last = _.get(location, 'query.current');
    let current = _.get(this.state, 'current', last);
    let studentId = _.get(params, 'studentId');

    return (
      <div className="books">
        <header>
          <i className="hui-icon-carat-l"
             onClick={()=>hashHistory.push(`students/${studentId}/${last}`)}/>
          <span>选择词书</span>
          <i className="hui-icon-user-solid"/>
        </header>
        <section>
          <ul className="list">
            {
              _.map(books, item=> {
                let {bookId, bookName, passPercentage} = item;

                return (
                  <li key={bookId} onClick={()=>this.onClick(bookId)}>
                    <div>
                      <h2 className="title">{bookName}</h2>
                      {
                        bookId == 0
                          ? ''
                          : <p className="description">
                          进度<em>{passPercentage}%</em></p>
                      }
                    </div>
                    <i
                      className={`radio ${current==bookId?'checked':''}`}/>
                  </li>
                )
              })
            }
          </ul>
          <button className="btn-primary"
                  onClick={()=>hashHistory.push(`students/${studentId}/${current}`)}>
            完成
          </button>
        </section>
      </div>
    )
  }
}

export default createConnector((props$, state$, dispatch$) => {
  const actionCreators$ = bindActionCreators({
    fetchBooks
  }, dispatch$);


  const fetch$ = props$.withLatestFrom(
    actionCreators$,
    (props, ac)=>
      ac.fetchBooks(_.get(props, 'params.studentId'))
  ).flatMap(obs => obs);

  return combineLatest(
    props$, state$, fetch$,
    (props, state, fetch)=> ({
      fetch,
      ...props,
      books: state.books
    })
  )
}, Books);