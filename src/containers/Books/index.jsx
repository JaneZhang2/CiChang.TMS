import React from 'react';
import './index.scss'

class Books extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="books">
        <header>
          <i className="hui-icon-carat-l"></i>
        </header>
        <section>
          <ul>
            <li>
              <div>
                <h2 className="title">全部词书</h2>
              </div>
              <i className="checked"/>
            </li>
            <li>
              <div>
                <h2 className="title">学英语绕不过的1000词</h2>
                <p className="description">进度<em>10%</em></p>
              </div>
              <i/>
            </li>
            <li>
              <div>
                <h2 className="title">全部词书</h2>
                <p></p>
              </div>
              <i/>
            </li>
            <li>
              <div>
                <h2 className="title">全部词书</h2>
                <p></p>
              </div>
              <i/>
            </li>
            <li>
              <div>
                <h2 className="title">全部词书</h2>
                <p></p>
              </div>
              <i/>
            </li>
            <li>
              <div>
                <h2 className="title">全部词书</h2>
                <p></p>
              </div>
              <i/>
            </li>
            <li>
              <div>
                <h2 className="title">全部词书</h2>
                <p></p>
              </div>
              <i/>
            </li>
          </ul>
          <button className="btn-primary">完成</button>
        </section>
      </div>
    )
  }
}

export default Books;