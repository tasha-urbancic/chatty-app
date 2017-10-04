import React, { Component } from 'react';

import NavBar from './components/NavBar.jsx';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';
// import messages from './chatty-messages.json';
import user from './chatty-users.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user
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

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/");
    console.log('Connected to server');
    var app = this;
    this.socket.onmessage = function (event) {
      const newMessage = JSON.parse(event.data);
      app.setState({ messages: [...app.state.messages, newMessage]});
    }
  }

  // pass in sendMessage Function
  render() {
    const {messages, user} = this.state;
    return (
      <div>
        <NavBar />
        <MessageList messages={messages} />
        <ChatBar currentUser={user.name} sendMessage={this.sendMessage} />
      </div>
    );
  }
}
export default App;
