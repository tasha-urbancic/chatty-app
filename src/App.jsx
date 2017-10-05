import React, { Component } from 'react';

import NavBar from './components/NavBar.jsx';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: { name: 'Bob' }
    };
  }

  // this is the input from chat box
  sendMessage = content => {
    const newMessage = {
      type: 'postMessage',
      username: this.state.user.name,
      content
    };
    console.log(`Sending a message to chatty server ${newMessage.content}`);
    this.socket.send(JSON.stringify(newMessage));
  };

  updateUser = username => {
    const userA = this.state.user.name;
    if (userA !== username) {
      const newNotification = {
        type: 'postNotification',
        content: `${userA} has changed their name to ${username}`
      };
      console.log(newNotification);
      console.log(
        `Sending a new notification to chatty server ${newNotification.content}`
      );
      this.socket.send(JSON.stringify(newNotification));
      this.setState({ user: { name: username } });
    }
  };

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');
    console.log('Connected to server');
    var app = this;
    this.socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'incomingMessage':
          app.setState({
            messages: [...app.state.messages, data]
          });
          break;
        case 'incomingNotification':
          app.setState({
             messages: [...app.state.messages, data] 
          });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }
    };
  }

  // pass in sendMessage Function
  render() {
    const { messages, user} = this.state;
    return (
      <div>
        <NavBar />
        <MessageList messages={messages}/>
        <ChatBar
          currentUser={user.name}
          sendMessage={this.sendMessage}
          updateUser={this.updateUser}
        />
      </div>
    );
  }
}
export default App;
