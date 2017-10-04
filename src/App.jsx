import React, { Component } from 'react';

import NavBar from './components/NavBar.jsx';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: { 'name': 'Bob' }
    };
  }

  // this is the input from chat box
  sendMessage = (content) => {
    const newMessage = {
        username: this.state.user.name,
        content
    };
    console.log(`Sending a message to chatty server ${newMessage.content}`);
    this.socket.send(JSON.stringify(newMessage));
  }

  updateUser = (username) => {
    console.log(`Updating user to ${username}`);
    this.setState({ user: {name: username}});
  }


  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');
    console.log('Connected to server');
    var appContext = this;
    this.socket.onmessage = function (event) {
      const newMessage = JSON.parse(event.data);
      appContext.setState({ messages: [...appContext.state.messages, newMessage]});
    }
  }

  // pass in sendMessage Function
  render() {
    const {messages, user} = this.state;
    return (
      <div>
        <NavBar />
        <MessageList messages={messages} />
        <ChatBar currentUser={user.name} sendMessage={this.sendMessage} updateUser={this.updateUser} />
      </div>
    );
  }
}
export default App;
