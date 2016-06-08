import React from 'react';
import 'swiper/dist/css/swiper.min.css'
import 'spinkit/scss/spinkit.scss'
import './index.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {fetchOrgans, fetchUserRankings} from '../../actions'
import Ranking from '../../components/Ranking'
import Filter from '../../components/Filter'
import config from 'app.config'
import moment from 'moment'
import {hashHistory} from 'react-router'
import Message from '../../components/Message'

class Rankings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dialogTemplate: '',
      currentDialogId: '',
      pageIndex: 0
    }
  }

  closeDialog() {
    this.setState({currentDialogId: ''});
  }

  setCurrentDialogId(id) {
    this.setState({currentDialogId: id});
  }

  toggleDialog(dialogId) {
    let {currentDialogId} = this.state;
    this.setState({currentDialogId: currentDialogId ? '' : dialogId});
  }

  componentDidUpdate(props) {
    let self = this;
    let query = _.get(this.props, 'location.query');

    if (_.get(props, 'location.key') !=
      _.get(this.props, 'location.key')) {

      this.props.fetchOrgans(this.props.params);

      this.props.fetchUserRankings({
        category: _.get(this.props, 'params.category'),
        schoolId: this.props.id,
        selectedOrganId: _.get(query, 'orgId', this.props.id),
        sortType: _.get(query, 'sortType', 'wordsDesc'),
        startDate: _.get(query, 'startDate', moment().hours(-24).format('YYYY-MM-DD')),
        endDate: _.get(query, 'endDate', moment().hours(-24).format('YYYY-MM-DD')),
        pageIndex: 0,
        pageSize: 50
      }).then(()=> {
        mui('#pullrefresh').pullRefresh().refresh(true);
        self.setState({pageIndex: 1});
      })
    }
  }

  componentDidMount() {
    let self = this;

    this.props.fetchOrgans(this.props.params)
      .then(()=> {
        mui.init({
          pullRefresh: {
            container: '#pullrefresh',
            down: {
              callback: ()=> mui('#pullrefresh').pullRefresh().endPulldownToRefresh()
            },
            up: {
              contentrefresh: '正在加载...',
              callback: ()=> {//上拉加载具体业务实现
                let {pageIndex} = self.state;
                let {id, location, params} = self.props;
                let query = _.get(location, 'query');

                self.props.fetchUserRankings({
                  category: _.get(params, 'category'),
                  schoolId: id,
                  selectedOrganId: _.get(query, 'orgId', id),
                  sortType: _.get(query, 'sortType', 'wordsDesc'),
                  startDate: _.get(query, 'startDate', moment().hours(-24).format('YYYY-MM-DD')),
                  endDate: _.get(query, 'endDate', moment().hours(-24).format('YYYY-MM-DD')),
                  pageIndex: pageIndex,
                  pageSize: 50
                })
                  .then((data)=> {
                    let length = _.get(data, 'payload.items.length', 0);
                    if (length > 0) {
                      self.setState({pageIndex: pageIndex + 1});
                    }
                    if (pageIndex == 0) {
                      mui('#pullrefresh').pullRefresh().scrollTo(0, 0);
                    }
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(length == 0); //参数为true代表没有更多数据了。
                  });
              }
            }
          }
        });

        if (mui.os.plus) {
          mui.plusReady(function () {
            setTimeout(function () {
              mui('#pullrefresh').pullRefresh().pullupLoading();
              mui(".mui-table-view").on('tap', '.mui-table-view-cell', function (e) {
                hashHistory.push(this.dataset.url);
              })
            }, 1000);

          });
        } else {
          mui.ready(function () {
            mui('#pullrefresh').pullRefresh().pullupLoading();
            mui(".mui-table-view").on('tap', '.mui-table-view-cell', function (e) {
              hashHistory.push(this.dataset.url);
            })
          });
        }
      });
  }

  render() {
    let {currentDialogId} = this.state;
    let {organs, location, rankings, params, id} = this.props;

    let items = _.get(rankings, 'items');

    return (
      <div className="layout">
        <header>
          <i className="hui-icon-carat-l"></i>
          <Ranking
            params={params}
            currentDialogId={currentDialogId}
            closeDialog={this.closeDialog.bind(this)}
            setCurrentDialogId={this.setCurrentDialogId.bind(this)}
            toggleDialog={id=>this.toggleDialog(id)}
          />
          <a className="hui-icon-user-solid" href={config.MY_ACCOUNT_URL}></a>
        </header>
        {
          organs instanceof Error ?
            <Message title="对不起" description={organs.message}/> :
            <Filter
              params={params} options={organs} id={id}
              query={_.get(location,'query')}
              currentDialogId={currentDialogId}
              closeDialog={this.closeDialog.bind(this)}
              setCurrentDialogId={this.setCurrentDialogId.bind(this)}
              toggleDialog={id=>this.toggleDialog(id)}
            />
        }
        <section>
          {
            (()=> {
              if (rankings instanceof Error) {
                return (
                  <Message title="对不起" description={rankings.message}/>
                )
              }

              if (!rankings.loading && _.isEmpty(items)) {
                return <Message title="空空如也" description="暂无成员信息"/>
              }
            })()
          }
          <div id="pullrefresh" className="mui-content mui-scroll-wrapper">
            {
              (()=> {
                return (
                  <div className="mui-scroll">
                    <ul className="mui-table-view mui-table-view-chevron">
                      {
                        (()=> {
                          switch (_.get(params, 'category')) {
                            case 'users':
                              return _.map(items, (item, index)=> {
                                return (
                                  <li
                                    key={index}
                                    data-url={`students/${_.get(item,'userId')}/0?from=rankings`}
                                    className="mui-table-view-cell"
                                  >
                                <span><small>{String(index + 1).replace(/(^\d$)/, '0$1')}</small>
                                  {_.get(item, 'studentName')}</span>
                                <span>{_.get(item, 'words')}
                                  <small>词</small></span>
                                <span>{_.get(item, 'days')}
                                  <small>天</small></span>
                                  </li>
                                )
                              });
                            case 'class':
                              return _.map(items, (item, index)=> {
                                return (
                                  <li key={index}
                                      className="mui-table-view-cell">
                                <span><small>{String(index + 1).replace(/(^\d$)/, '0$1')}</small>
                                  {_.get(item, 'organName')}</span>
                                <span>{_.get(item, 'words')}
                                  <small>词</small></span>
                                  </li>
                                )
                              });
                          }
                        })()
                      }
                    </ul>
                  </div>
                );
              })()
            }
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    id: state.id,
    organs: state.organs,
    rankings: state.rankings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchOrgans, fetchUserRankings}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Rankings);