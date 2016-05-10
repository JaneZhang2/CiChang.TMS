import React from 'react';
import './index.scss';

class Ranking extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="ranking">
        <div>排名-人</div>
        <ul style={{display:'none'}}>
          <li>排名-人</li>
          <li>排名-班级</li>
        </ul>
      </div>
    )
  }
}

export default Ranking;