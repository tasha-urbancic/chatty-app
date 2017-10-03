import React, { Component } from 'react';

import NavBar from './components/NavBar.jsx';
import ChatBar from './components/ChatBar.jsx';
import MessageList from './components/MessageList.jsx';
import chattyData from './chatty-data.json';

// chattyData = JSON.parse(chattyData);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: chattyData
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.posts.messages}/>
        <ChatBar currentUser={this.state.posts.currentUser}/>
      </div>
    )
  }

}
export default App;
