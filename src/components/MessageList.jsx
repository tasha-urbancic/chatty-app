import React, { Component, PropTypes } from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
  }
  
  render() {
    const messages = this.props.messages.map(message => {
      return <Message 
      content={message.content}
      username={message.username}
      key={message.id}
      />
    });
    return (
      <main className='messages'>
        {messages}
      </main>
    );
  }
}

export default MessageList;
