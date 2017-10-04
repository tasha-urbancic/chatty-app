import React, { Component, PropTypes } from 'react';

class ChatBar extends Component {

  // so that react knows what the prop types are
  static propTypes = {
    currentUser: PropTypes.string,
    sendMessage: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired
  }

  render() {
    return (
      <footer className='chatbar'>
        <input
          className = 'chatbar-username'
          defaultValue = {this.props.currentUser}
          onBlur = {this.handleChangeUserEnter}
        />
        <input
          className = 'chatbar-message'
          placeholder = 'Type a message and hit ENTER'
          onKeyPress = {this.handleNewMessageEnter}
        />
      </footer>
    );
  }

  // on enter send input value to sendMessage function
  handleNewMessageEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.sendMessage(event.target.value);
      event.target.value = '';
    }
  }

  handleChangeUserEnter = (event) => {
    event.preventDefault();
    this.props.updateUser(event.target.value);
    event.target.placeholder = event.target.value;
  }

}

// onFocus={(e) => e.target.placeholder = ""} 
// onBlur={(e) => e.target.placeholder = "Name"}

export default ChatBar;
