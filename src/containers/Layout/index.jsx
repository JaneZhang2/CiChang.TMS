import React from 'react';
import './index.scss'
import Ranking from '../../components/Ranking'

class Layout extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="layout">
        <header>
          <i className="hui-icon-carat-l"></i>
          <i className="hui-icon-user-solid"></i>
        </header>
        <section>
          {this.props.children}
        </section>
      </div>
    )
  }
}

export default Layout;