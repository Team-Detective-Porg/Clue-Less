import WebSocketInstance from './WebSocket.js'

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    WebSocketInstance.addCallbacks(this.setMessages.bind(this), this.addMessage.bind(this))
    WebSocketInstance.fetchMessages(this.props.currentUser);
  }
  
  addMessage(message) {
    this.setState({ messages: [...this.state.messages, message]});
  }

  setMessages(messages) {
    this.setState({ messages: messages.reverse()});
  }
}