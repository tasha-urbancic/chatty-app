import React, { Component, PropTypes } from 'react';

class Message extends Component {
  static propTypes = {
    content: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.string,
    color: PropTypes.string
  }
  render() {
    const {content, username, color, id} = this.props;
    return (
      <div className='message' key={id}>
        <span className='message-username' style={{color: color}}>{username}</span>
        <span className='message-content'>
          {content}
        </span>
      </div>
    );
  }
}

export default Message;

/* <div className='message system'>
**UserA** changed their name to **UserB**
</div> */