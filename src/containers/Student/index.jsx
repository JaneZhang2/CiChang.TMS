import React from 'react'
import {createConnector} from 'redux-rx/react'
import {hashHistory} from 'react-router'
import _ from 'lodash'
import './index.scss'
import {fetchStudent, fetchBooks} from '../../actions'
import {bindActionCreators} from 'redux-rx'
import moment from 'moment'
import echarts from 'echarts'
import Swiper from 'swiper'
import 'isomorphic-fetch'
import URI from 'urijs'

const {combineLatest} = Rx.Observable;

const option = {
  tooltip: {
    trigger: 'axis',
    formatter: params=>`${_.get(params, '0.value', 0)}词`
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [],
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false
    }
  },
  series: [
    {
      type: 'line',
      data: []
    }
  ]
};

class Student extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(props) {
    if (!_.eq(props.student, this.props.student)) {
      let items = _.get(props, 'student.studyDays', []),
        config = _.assign({}, option);

      _.set(config, 'xAxis.data', _.map(items, item=>_.get(item, 'studyDate')));
      _.set(config, 'series.0.data', _.map(items, item=>_.get(item, 'studyCount')));


      echarts.init(this.swiper.slides[this.swiper.activeIndex])
        .setOption(config);
    }
  }

  componentDidMount() {
    let self = this;


    this.swiper = new Swiper('.swiper-container', {
      loop: true,
      loopedSlides: 1,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true,//修改swiper的父元素时，自动初始化swiper
      onInit: (swiper)=> {

        swiper.on('slideChangeEnd', (swiper)=> {
          swiper.removeAllSlides(0);
          swiper.appendSlide(`<div class="swiper-slide">loading</div>`);

          self.props.fetchStudent(
            {
              ...self.props.params,
              currentDate: moment().format('YYYY-MM-DD')
            }
          ).subscribe(()=> {
              swiper.unlockSwipes();
            }
          );
        });
      }
    });
  }

  componentWillUnmount() {
    this.swiper.destroy();
  }

  render() {
    let {student, books, params} = this.props;

    let current = _.find(books, {bookId: Number(_.get(params, 'bookId', 0))});
    let bookId = _.get(current, 'bookId'),
      bookName = _.get(current, 'bookName');

    return (
      <div className="student">
        <header>
          <i
            className="hui-icon-carat-l"
            onClick={()=>hashHistory.push('/')}
          />
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
            onClick={()=>{hashHistory.push(String(
              new URI(`books/${_.get(student,'studentInfo.userId')}`)
              .query({current:bookId})
            ))}}>
            {bookName}
            <i className="hui-icon-carat-r"/></a>
        </section>
        <section className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide"/>
          </div>
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
    props$, state$, fetch$, actionCreators$,
    (props, state, fetch, ac)=> ({
      fetch,
      ...props,
      student: state.student,
      books: state.books,
      fetchBooks: ac.fetchBooks,
      fetchStudent: ac.fetchStudent
    })
  )
}, Student);