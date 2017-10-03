import React, { Component } from "react";

class Message extends React.Component {
  render() {
    const {content, username, id} = this.props;
    return (
      <div>
        <div className="message" key={id}>
          <span className="message-username">{username}</span>
          <span className="message-content">
            {content}
          </span>
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </div>
    );
  }
}

export default Message;
