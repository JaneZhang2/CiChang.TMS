import React from 'react';
import './index.scss';

class Ranking extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="ranking-container">
        <div>排名-人<i className="hui-icon-carat-d-small"></i></div>
        <div className="ranking-modal">
          <div className="arrow"></div>
          <ul>
            <li className="active">
              排名-人<i className="hui-icon-checked-small"></i>
            </li>
            <li>排名-班级</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Ranking;