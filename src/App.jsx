import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

var name = "Chatty";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">{name}</a>
        </nav>
        <MessageList />
        <ChatBar />
      </div>
    );
  }
}
export default App;
