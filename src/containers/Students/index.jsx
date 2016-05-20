import React from 'react';
import Rx from 'rx'
import _ from 'lodash'
import {bindActionCreators} from 'redux-rx';
import {createConnector} from 'redux-rx/react';
import Swiper from 'swiper'
import {hashHistory} from 'react-router'
import {fetchOrgans, fetchUserRankings} from '../../actions'
import Filter from '../../components/Filter'
import 'swiper/dist/css/swiper.min.css'
import 'spinkit/scss/spinkit.scss'
import './index.scss';
import moment from 'moment'
import Ranking from '../../components/Ranking'
import Message from '../../components/Message'

const {combineLatest} = Rx.Observable;

class Students extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidUpdate() {
    this.swiper.update();
  }

  componentDidMount() {
    let self = this;
    let {query} = this.props;

    this.setState({
      schoolId: 30,
      selectedOrganId: _.get(query, 'selectedOrganId', 30),
      sortType: _.get(query, 'sortType', 'wordsDesc'),
      startDate: _.get(query, 'startDate', moment().hours(-24).format('YYYY-MM-DD')),
      endDate: _.get(query, 'endDate', moment().hours(-24).format('YYYY-MM-DD')),
      pageIndex: 0,
      pageSize: 50
    });

    this.swiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      scrollbar: '.swiper-scrollbar',
      scrollbarHide: true,
      slidesPerView: 14,
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true,//修改swiper的父元素时，自动初始化swiper
      onInit: (swiper)=> {

        swiper.on('touchEnd', (swiper, event)=> {
          if (!swiper.isEnd) {
            return;
          }

          swiper.lockSwipes();
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

          let {pageIndex} = self.state;

          pageIndex += 1;

          self.setState({pageIndex});

          self.props.fetchUserRankings({
              // type
              ...self.state,
              pageIndex: pageIndex
            })
            .subscribe(()=> {
                swiper.unlockSwipes();
                swiper.removeSlide(swiper.slides.length - 1);
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
    let {organs, location, rankings} = this.props;

    console.log(this.props);

    return (
      <div className="layout">
        <header>
          <i className="hui-icon-carat-l"></i>
          <Ranking params={this.props.params}/>
          <i className="hui-icon-user-solid"></i>
        </header>
        <section>
          {
            (fetch instanceof Error)
              ? <Message title='对不起' content={fetch.message}/>
              : <div className="homepage">
              <Filter options={organs} query={_.get(location,'query')}/>
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  {
                    _.map(_.get(rankings, 'items'), (item, index)=> {

                      let {userId, studentName, words, days} = item;

                      return (
                        <div key={index}
                             onClick={()=>hashHistory.push(`students/${userId}`)}
                             className="swiper-slide">
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
                <div className="swiper-scrollbar"/>
              </div>
            </div>
          }
        </section>
      </div>
    )
  }
}

export default createConnector((props$, state$, dispatch$) => {
  const actionCreators$ = bindActionCreators({
    fetchOrgans,
    fetchUserRankings
  }, dispatch$);

  const fetch$ = props$.withLatestFrom(
    actionCreators$,
    (props, ac)=>
      ac.fetchOrgans()
        .flatMap(organs=> {
          let query = _.get(props, 'location.query'),
            orgId = _.get(organs, 'payload.orgId');

          return ac.fetchUserRankings({
            category: _.get(props, 'params.category'),
            schoolId: orgId,
            selectedOrganId: _.get(query, 'selectedOrganId', orgId),
            sortType: _.get(query, 'sortType', 'wordsDesc'),
            startDate: _.get(query, 'startDate', moment().hours(-24).format('YYYY-MM-DD')),
            endDate: _.get(query, 'endDate', moment().hours(-24).format('YYYY-MM-DD')),
            pageIndex: 0,
            pageSize: 50
          })
        })
  ).flatMap(obs => obs);

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
}, Students);