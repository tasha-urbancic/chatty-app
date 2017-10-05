import React, { Component, PropTypes } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
    notifications: PropTypes.arrayOf(PropTypes.object)
  };

  render() {
    const messages = this.props.messages.map(message => {
      switch (message.type) {
        case 'incomingNotification':
          return <Notification content={message.content} id={message.id} />;
        case 'incomingMessage':
          return (
            <Message
              content={message.content}
              username={message.username}
              id={message.id}
            />
          );
        case 'incomingNewConnection':
          return (
            <Notification
              content={message.content}
              id={message.id}
            />
          );
        default:
          throw new Error('unknown event type ' + message.type);
      }
    });

    return <main className="messages">{messages}</main>;
  }
}

export default MessageList;
