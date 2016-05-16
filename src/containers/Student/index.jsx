import React from 'react'
import {createConnector} from 'redux-rx/react'
import {hashHistory} from 'react-router'
import _ from 'lodash'
import './index.scss'
import {fetchStudent, fetchBooks} from '../../actions'
import {bindActionCreators} from 'redux-rx'
import moment from 'moment'

const {combineLatest} = Rx.Observable;

class Student extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let {student, books, params} = this.props;

    let current = _.find(books, {bookId: Number(_.get(params, 'bookId', 0))});

    return (
      <div className="student">
        <header>
          <i className="hui-icon-carat-l"></i>
        </header>
        <section className="userinfo">
          <figure>
            <img
              className="avatar"
              src={_.get(student,'studentInfo.userHeadUrl')}
            />
            <figcaption>
              <p>{_.get(student, 'studentInfo.studentName')}</p>
              <p>
                <small>三年级2班</small>
              </p>
            </figcaption>
          </figure>
          <div className="data">
            <div>
              <p><em>{_.get(student, 'studyData.words')}</em>词</p>
              <p>已学</p>
            </div>
            <div className="seperator"/>
            <div>
              <p><em>{_.get(student, 'studyData.passPercentage')}</em>%</p>
              <p>闯关进度</p>
            </div>
          </div>
        </section>
        <section className="book">
          <h2 className="title">选择词书</h2>
          <a
            onClick={()=>{hashHistory.push(`books/${_.get(student,'studentInfo.userId')}`)}}>
            {_.get(current, 'bookName')}
            <i className="hui-icon-carat-l"/></a>
        </section>
        <section className="chart">
          xxx
        </section>
      </div>
    )
  }
}

export default createConnector((props$, state$, dispatch$) => {
  const actionCreators$ = bindActionCreators({
    fetchStudent,
    fetchBooks
  }, dispatch$);

  const fetch$ = props$.withLatestFrom(
    actionCreators$,
    (props, ac)=>
      Rx.Observable.when(
        ac.fetchStudent({
          ...props.params,
          currentDate: moment().format('YYYY-MM-DD')
        }).thenDo(student=>student),
        ac.fetchBooks().thenDo(books=>books)
      )
  ).flatMap(obs => obs);

  return combineLatest(
    props$, state$, fetch$,
    (props, state, fetch)=> ({
      fetch,
      ...props,
      student: state.student,
      books: state.books
    })
  )
}, Student);