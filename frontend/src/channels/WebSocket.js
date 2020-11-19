class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
  }

  connect() {
    const roomName = window.location.pathname.substr(1);
    console.log(roomName);
    var path = 'ws://'
        + 'localhost:8000/'
        + roomName 
        + '/';
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log('WebSocket open: ' + roomName);
    };
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
    };

    this.socketRef.onerror = e => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed let's reopen");
      this.connect();
    };
  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    console.log('Data back from channel: ' + data);
    const type = parsedData.type;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (type === 'lobby.message') {
      // console.log(this.callbacks[type])
      this.callbacks[type](parsedData);
    }
    if (type === 'game.message') {
      // console.log(this.callbacks[type])
      this.callbacks[type](parsedData);
    }
  }

  initChatUser(username) {
    this.sendMessage({ command: 'init_chat', username: username });
  }

  fetchMessages(username) {
    this.sendMessage({ command: 'fetch_messages', username: username });
  }

  newChatMessage(message) {
    this.sendMessage({ command: 'new_message', from: message.from, text: message.text }); 
  }

  addCallbacks(key, callback) {
    this.callbacks[key] = callback;
    console.log(this.callbacks);
  }

  waitForSocketConnection(callback){
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(
      function () {
        if (socket.readyState === 1) {
          console.log("Connection is made")
          if(callback != null){
            callback();
          }
          return;

        } else {
          console.log("wait for connection...")
          recursion(callback);
        }
      }, 1); // wait 5 milisecond for the connection...
  }
  
  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
    }
    catch(err) {
      console.log(err.message);
    }  
  }

  state() {
    return this.socketRef.readyState;
  }

}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;