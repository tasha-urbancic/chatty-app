import React, { Component } from 'react';

import NavBar from './components/NavBar.jsx';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';
import messages from './chatty-messages.json';
import user from './chatty-users.json';

// chattyData = JSON.parse(chattyData);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages,
      user
    };
    this.nextId = 100;
  }

  getNewId() {
    return this.nextId++;
  }

  // this is the input from chat box
  sendMessage = (content) => {
    const newMessage = {
        username: this.state.user.name,
        content,
        id: this.getNewId()
    };
    console.log(`Sending a message ${newMessage.content}`);
    this.setState({ messages: [...this.state.messages, newMessage]});
  }

  // componentDidMount() {
  //   console.log('componentDidMount <App />');
  //   this._timer = setTimeout(() => {
  //     console.log('Simulating incoming message');
  //     const newMessage = {
  //       username: 'Michelle',
  //       content: 'Hello there!',
  //       id: 3
  //     };
  //     this.setState({ messages: [...this.state.messages, newMessage]});
  //   }, 3000);
  // }

  // componentWillUnmount() {
  //   clearTimeout(this._timer);
  // }

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
