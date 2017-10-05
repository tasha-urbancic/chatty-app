const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Function which broadcasts messages to all users
broadcast = (data) => {
  for(let client of wss.clients) {
    if (client.readyState === 1) {
      client.send(data);
    }
  }
}

// function that handles message according to data type
handleMessage = (data) => {
  const dataParsed = JSON.parse(data);
  if (dataParsed.type === 'postMessage') {
    dataParsed.id = uuidv1();
    dataParsed.type = 'incomingMessage'
    broadcast(JSON.stringify(dataParsed));
  } else if (dataParsed.type === 'postNotification'){
    dataParsed.type = 'incomingNotification'
    dataParsed.id = uuidv1();
    broadcast(JSON.stringify(dataParsed));
  }
}

// function that handles a new user connecting
handleNewConnection = () => {
  const connectionNotification = {
    content: 'New user connected!',
    type: 'incomingNewConnection',
    numberConnected: wss.clients.size,
    id: uuidv1()
  }
  broadcast(JSON.stringify(connectionNotification));
}

// function that handles a user disconnecting
handleClosedConnection = () => {
  const connectionNotification = {
    content: 'User disconnected!',
    type: 'incomingNewConnection',
    numberConnected: wss.clients.size,
    id: uuidv1()
  }
  broadcast(JSON.stringify(connectionNotification));
}

wss.on('connection', (ws) => {
  handleNewConnection();
  ws.on('message', handleMessage);
  ws.on('close', () => {
    handleClosedConnection();
  });

});