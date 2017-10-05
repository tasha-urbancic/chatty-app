import React, { Component } from 'react';
import NavBar from './components/NavBar.jsx';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';

const colorList=['#9BC300', '#30088B', '#CBAE00','#8D007C'];

// function which assigns a random color from colorList 
// for each username change
function randomizeUserColor() {
  const randomIndex = Math.floor(Math.random()*(colorList.length-1));
  return colorList[randomIndex];
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: {name: 'anonymous', color: randomizeUserColor()},
      numberConnected: 0
    };
  }

  // Send the chat box message to server to broadcast
  sendMessage = content => {
    const newMessage = {
      type: 'postMessage',
      username: this.state.user.name,
      color: this.state.user.color,
      content
    };
    this.socket.send(JSON.stringify(newMessage));
  };

  // update the username, and send to the server to 
  // broadcast a notification to all users 
  updateUser = username => {
    const userA = this.state.user.name;
    if (userA !== username) {
      const newNotification = {
        type: 'postNotification',
        content: `${userA} has changed their name to ${username}`
      };
      this.socket.send(JSON.stringify(newNotification));
      this.setState({ user: { name: username, color: randomizeUserColor()} });
    }
  };

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001/');
    console.log('Connected to websocket server');
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
        case 'incomingNewConnection':
          app.setState({
            messages: [...app.state.messages, data],
            numberConnected: data.numberConnected
          });
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + data.type);
      }
    };
  }

  // Render the App component
  render() {
    const { messages, user, numberConnected } = this.state;
    return (
      <div>
        <NavBar numberConnected={numberConnected}/>
        <MessageList messages={messages} />
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
