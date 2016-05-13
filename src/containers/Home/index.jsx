import React from 'react';
import Rx from 'rx'
import _ from 'lodash'
import {bindActionCreators} from 'redux-rx';
import {createConnector} from 'redux-rx/react';
import Swiper from 'swiper'
import './index.scss';
import {fetchOrgans, fetchUserRankings} from '../../actions'
import Filter from '../../components/Filter'
import 'swiper/dist/css/swiper.min.css'

const {combineLatest} = Rx.Observable;

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      current: ''
    }
  }

  componentDidUpdate() {
    this.swiper.update();
  }

  componentDidMount() {
    let self = this;

    this.swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      scrollbar: '.swiper-scrollbar',
      scrollbarHide: true,
      slidesPerView: 14,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true,//修改swiper的父元素时，自动初始化swiper
      onReachEnd: (swiper)=> {
        let {fetchUserRankings} = self.props;
        if (fetchUserRankings) {
          swiper.appendSlide('<div className="swiper-slide">loading</div>')
          fetchUserRankings();
        }
      }
    });
  }

  render() {
    let {organs, rankings} = this.props;

    console.log(this.props)


    return (
      <div className="homepage">
        <Filter options={organs}/>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {
              _.map(_.get(rankings, 'items'), (item, index)=> {

                let {userId, studentName, words, days} = item;

                return (
                  <div key={index} className="swiper-slide">
                    <span><small>{String(index + 1).replace(/(^\d$)/, '0$1')}</small>
                      {studentName}</span>
                    <span>{words}
                      <small>词</small></span>
                    <span>{days}
                      <small>天</small></span>
                  </div>
                )
              })
            }
          </div>
          <div className="swiper-scrollbar"></div>
        </div>
      </div>
    )
  }
}

export default createConnector((props$, state$, dispatch$) => {
  const actionCreators$ = bindActionCreators({
    fetchUserRankings
  }, dispatch$);

  let fetch$ = dispatch$.flatMap(dispatch=>
    dispatch(fetchOrgans())
      .flatMap(organs=>dispatch(
        fetchUserRankings({
          schoolId: organs.orgId,
          gradeId: 0,
          classId: 0,
          sortType: 'wordsDesc',
          startDate: '',//昨天
          endDate: ''//昨天
        }))
      )
  );

  return combineLatest(
    props$, state$, actionCreators$, fetch$,
    (props, state, ac, fetch)=> ({
      fetch,
      ...props,
      organs: state.organs,
      rankings: state.rankings,
      fetchUserRankings: ac.fetchUserRankings
    })
  )
}, Home);