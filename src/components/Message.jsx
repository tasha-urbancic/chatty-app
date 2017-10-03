import React, { Component } from "react";

class Message extends React.Component {
  render() {
    const {content, username, id} = this.props;
    return (
      <div className="message" key={id}>
        <span className="message-username">{username}</span>
        <span className="message-content">
          {content}
        </span>
      </div>
    );
  }
}

export default Message;



const mightWantThisLater = `
<div className="message system">
Anonymous1 changed their name to nomnom.
</div>
`;
