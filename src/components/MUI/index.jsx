import React from 'react';
import './css/mui.css'
import './index.scss'
import mui from './js/mui'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {fetchOrgans, fetchUserRankings} from '../../actions'
import Ranking from '../Ranking'
import Filter from '../Filter'
import config from '../../config'
import moment from 'moment'
import {hashHistory} from 'react-router'

class Test extends React.Component {

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

  // componentWillUnmount() {
  //   this.xx.destroy();
  // }

  componentDidMount() {
    // alert('xx')
    let self = this;

    document.querySelector('.mui-table-view').addEventListener('tap', xx=> {
      for (var i = 0; i < xx.path.length; i++) {
        if (/mui-table-view-cell/.test(xx.path[i].className)) {
          hashHistory.push(xx.path[i].dataset.url);
          break;
        }
      }
    });

    this.props.fetchOrgans()
      .subscribe(()=> {
        self.xx = mui.init({
          pullRefresh: {
            container: '#pullrefresh',
            down: {
              callback: ()=> mui('#pullrefresh').pullRefresh().endPulldownToRefresh()
            },
            up: {
              contentrefresh: '正在加载...',
              callback: pullupRefresh
            }
          }
        });

        /**
         * 上拉加载具体业务实现
         */
        function pullupRefresh() {
          let {id, location} = self.props;
          let query = _.get(location, 'query');
          let pageIndex = self.state.pageIndex;

          self.props.fetchUserRankings({
            category: 'users',
            schoolId: id,
            selectedOrganId: _.get(query, 'orgId', id),
            sortType: _.get(query, 'sortType', 'wordsDesc'),
            startDate: _.get(query, 'startDate', moment().hours(-24).format('YYYY-MM-DD')),
            endDate: _.get(query, 'endDate', moment().hours(-24).format('YYYY-MM-DD')),
            pageIndex: pageIndex,
            pageSize: 50
          })
            .subscribe((data)=> {
              if (_.get(data, 'payload.items.length', 0) > 0) {
                self.setState({pageIndex: pageIndex + 1});
              }
              mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
            });
        }

        if (mui.os.plus) {
          mui.plusReady(function () {
            setTimeout(function () {
              mui('#pullrefresh').pullRefresh().pullupLoading();
            }, 1000);

          });
        } else {
          mui.ready(function () {
            mui('#pullrefresh').pullRefresh().pullupLoading();
          });
        }
      });
  }

  render() {
    let {currentDialogId} = this.state;
    let {organs, location, rankings, params, id} = this.props;

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
        <Filter
          params={params} options={organs} id={id}
          query={_.get(location,'query')}
          currentDialogId={currentDialogId}
          closeDialog={this.closeDialog.bind(this)}
          setCurrentDialogId={this.setCurrentDialogId.bind(this)}
          toggleDialog={id=>this.toggleDialog(id)}
        />
        <section>
          <div id="pullrefresh" className="mui-content mui-scroll-wrapper">
            <div className="mui-scroll">
              <ul className="mui-table-view mui-table-view-chevron">
                {
                  _.map(_.get(rankings, 'items'), (item, index)=> {
                    return (
                      <li
                        key={index}
                        data-url={`students/${_.get(item,'userId')}/0`}
                        onTap={()=>hashHistory.push()}
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
                  })
                }
              </ul>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Test);