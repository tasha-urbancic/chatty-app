import React, { Component, PropTypes } from 'react';

class ChatBar extends Component {

  // so that react knows what the prop types are
  static propTypes = {
    currentUser: PropTypes.string,
    sendMessage: PropTypes.func.isRequired
  }

  render() {
    return (
      <footer className='chatbar'>
        <input
          className = 'chatbar-username'
          defaultValue = {this.props.currentUser}
        />
        <input
          className = 'chatbar-message'
          placeholder = 'Type a message and hit ENTER'
          onKeyPress = {this.handleKeyPress}
        />
      </footer>
    );
  }

  // on enter send input value to sendMessage function
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.props.sendMessage(event.target.value);
      event.target.value = '';
    }
  }

}

export default ChatBar;
