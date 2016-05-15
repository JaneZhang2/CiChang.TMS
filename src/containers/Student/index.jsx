import React from 'react';
import './index.scss'
import {hashHistory} from 'react-router'

class Student extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="student">
        <header>
          <i className="hui-icon-carat-l"></i>
        </header>
        <section className="userinfo">
          <figure>
            <image className="avatar"></image>
            <figcaption>
              <p>王小明</p>
              <p>
                <small>三年级2班</small>
              </p>
            </figcaption>
          </figure>
          <div className="data">
            <div>
              <p><em>322</em>词</p>
              <p>已学</p>
            </div>
            <div className="seperator"/>
            <div>
              <p><em>30</em>%</p>
              <p>闯关进度</p>
            </div>
          </div>
        </section>
        <section className="book">
          <h2 className="title">选择词书</h2>
          <a onClick={()=>{hashHistory.push('books')}}>学英语绕不过的100词<i
            className="hui-icon-carat-l"/></a>
        </section>
        <section className="chart">
          xxx
        </section>
      </div>
    )
  }
}

export default Student;