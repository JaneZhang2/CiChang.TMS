import React from 'react';
import './index.scss'

class Message extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let {title, description} = this.props;

    return (
      <article className="message">
        <h1>{title}</h1>
        <p>{description}</p>
      </article>
    )
  }
}

export default Message