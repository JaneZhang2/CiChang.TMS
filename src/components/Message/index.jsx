import React from 'react';
import './index.scss'

class Message extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let {title, content} = this.props;

    return (
      <article className="message">
        <h1>{title}</h1>
        <p>{content}</p>
      </article>
    )
  }
}

export default Message