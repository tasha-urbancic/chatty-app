import React, { Component, PropTypes } from 'react';

class Message extends Component {
  static propTypes = {
    content: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.number
  }
  render() {
    const {content, username, id} = this.props;
    return (
      <div className='message' key={id}>
        <span className='message-username'>{username}</span>
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