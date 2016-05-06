import React from 'react';
import './index.scss'

class Layout extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="layout">
        <header>排名一人</header>
        <section>
          {this.props.children}
        </section>
      </div>
    )
  }
}

export default Layout;