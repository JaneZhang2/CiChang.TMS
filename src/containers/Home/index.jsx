import React from 'react';
import './index.scss';

class Home extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <article className="homepage">
        <ul className="filter">
          <li>
            <span>全校<i className="hui-icon-carat-d-small"></i></span>
            <ul>
              <li>全校</li>
              <li>一年级</li>
              <li>二年级</li>
              <li>三年级</li>
              <li>四年级</li>
              <li>五年级</li>
            </ul>
          </li>
          <li>
            <span>单词最多<i className="hui-icon-carat-d-small"></i></span>
            <ul>
              <li>单词最多</li>
              <li>单词最少</li>
            </ul>
          </li>
          <li>
            <span>昨日<i className="hui-icon-carat-d-small"></i></span>
            <ul>
              <li>昨日</li>
              <li>今日</li>
              <li>自选</li>
            </ul>
          </li>
        </ul>
      </article>
    )
  }
}

export default Home;