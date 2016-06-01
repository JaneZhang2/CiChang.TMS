import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {hashHistory} from 'react-router'
import _ from 'lodash'
import './index.scss'
import {fetchStudent, fetchBooks} from '../../actions'
import moment from 'moment'
import echarts from 'echarts'
import Swiper from 'swiper'
import 'isomorphic-fetch'
import URI from 'urijs'

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
    },
    minInterval: 10
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
    super(props);
    this.state = {
      currentWeek: moment()
    }
  }

  componentWillReceiveProps(props) {
    if (!_.eq(props.student, this.props.student)) {
      let items = _.get(props, 'student.studyDays', []),
        config = _.assign({}, option);

      _.set(config, 'xAxis.data', _.map(items, item=>_.get(item, 'studyDate')));
      _.set(config, 'series.0.data', _.map(items, item=>_.get(item, 'studyCount')));

      let element = this.swiper.slides[this.swiper.activeIndex];

      if (element) {
        echarts.init(element).setOption(config);
      }
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
        self.props.fetchStudent({
          ...self.props.params,
          bookId: 0,
          currentWeek: moment().format('YYYY-MM-DD')
        });
        self.props.fetchBooks(_.get(self.props, 'params.studentId'));

        swiper.on('slideChangeEnd', (swiper)=> {
          swiper.removeAllSlides();
          swiper.appendSlide(
            `<div class="swiper-slide">
              <div class="sk-wave">
                <div class="sk-rect sk-rect1"></div>
                <div class="sk-rect sk-rect2"></div>
                <div class="sk-rect sk-rect3"></div>
                <div class="sk-rect sk-rect4"></div>
                <div class="sk-rect sk-rect5"></div>
              </div>
            </div>`
          );
          swiper.lockSwipes();

          let {swipeDirection} = swiper;

          self.props.fetchStudent(
            {
              ...self.props.params,
              currentWeek: self.state.currentWeek.day(swipeDirection == 'next' ? 7 : -7).format('YYYY-MM-DD')
            }
          ).then(()=> {
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
            onClick={()=>hashHistory.go(-1)}
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
                <small>{_.get(student, 'studentInfo.ogranName')}</small>
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

function mapStateToProps(state) {
  return {
    student: state.student,
    books: state.books
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchStudent, fetchBooks}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);