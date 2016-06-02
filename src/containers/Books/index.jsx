import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {hashHistory} from 'react-router'
import './index.scss'
import {fetchBooks} from '../../actions'
import Message from '../../components/Message'

class Books extends React.Component {

  constructor(props) {
    super(props);
  }

  onClick(id) {
    this.setState({
      current: id
    })
  }

  componentDidMount() {
    this.props.fetchBooks(_.get(this.props, 'params.studentId'));
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
             onClick={()=>hashHistory.go(-1)}/>
          <span>选择词书</span>
          <i className="hui-icon-user-solid"/>
        </header>
        {
          (()=> {
            if (books instanceof Error) {
              return (
                <Message title="对不起" description={books.message}/>
              )
            }
          })()
        }
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

function mapStateToProps(state) {
  return {
    student: state.student,
    books: state.books
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchBooks}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Books);