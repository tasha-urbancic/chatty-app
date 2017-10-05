import React, { Component, PropTypes } from 'react';

class ChatBar extends Component {
  // so that react knows what the prop types are
  static propTypes = {
    currentUser: PropTypes.string,
    sendMessage: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired
  };

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          defaultValue={this.props.currentUser}
          onBlur={this.handleChangeUser}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.handleNewMessageEnter}
        />
      </footer>
    );
  }

  // on enter send input value to sendMessage function
  handleNewMessageEnter = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.sendMessage(event.target.value);
      event.target.value = '';
    }
  };

  handleChangeUser = event => {
    event.preventDefault();
    const newUserName = event.target.value;
    if (newUserName.length > 0) {
      this.props.updateUser(newUserName );
      event.target.defaultValue = newUserName;
    } else {
      console.log('Must enter a username!')
      event.target.defaultValue = this.props.currentUser;
    }
  };
}

// onFocus={(e) => e.target.placeholder = ""}
// onBlur={(e) => e.target.placeholder = "Name"}

export default ChatBar;
