import React from 'react';

// import { fetchShops } from '../models/shop'

var socket = require('socket.io-client')('http://localhost:4000');
export default class Chat extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      room: {},
      messages: [],
      socket: socket,
      user: undefined
    };
  }
  componentDidMount(){
    this.state.socket.on('receive-message', (msg)=>{ // es6 style, implicitly binds parameter "this"
      var messages = this.state.messages;
      messages.push(msg);
      this.setState({messages: messages})
      console.log(this.state.messages);
    })
  }

  submitMessage(){
    var body = document.getElementById("message").value;
    var message = {
      body: body,
      user: this.state.user || "anonymous"
    }
    this.state.socket.emit('new-message', message);
  }
  pickUser(){
    var user = document.getElementById("user").value;
    this.setState({user: user})
  }

  // The following should grab the rooms and fetch the messages
  // for that room.
  // componentDidMount(){
  //   grabRooms()
  //     .then((roomData) => {
  //       this.setState({room: roomData}))
  //     });
    
  //   grabMessages()
  //     .then((messageData) =>{
  //       this.setState({messages: messageData})
  //     });
  // }


  render(){
    var messages = this.state.messages.map((msg)=>
      <li><strong>{msg.user}</strong><span>: {msg.body}</span></li>
    )
    return (
      <div className='chat-box'>
        <ul>
          {messages}
        </ul>
        <input id="message" type="text"/> <button onClick={()=>this.submitMessage()}>Send</button><br/>
        <input id="user" type="text"/> <button onClick={()=>this.pickUser()}>Choose a Username</button>
      </div>
    );
  }
}