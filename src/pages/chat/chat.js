import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Body from '../components/body';
import Users from "./components/users";
import Messages from "./components/messages";
import { Socket } from "./socket_io";
import None from "./components/none";

class Chat extends React.Component {
    state = {
      message_to: "",
      view: <div/>
    }
    constructor() {
      super();
      this.userClick = this.userClick.bind(this);
      this.new_user_event = this.new_user_event.bind(this);
    } 

    userClick(event) {
      let userName = event.data.name;
      window.localStorage.setItem("conversation",userName);
      let element = <Messages title={userName} socket={Socket}/>;
      this.setState({message_to: <None/>}, function() {
        this.setState({message_to: element });
      });
    }

    new_user_event(data){
      const { connectedUsers } = data;
      const { conversation } = window.localStorage;
      let found = false;
      for(let i = 0; i < connectedUsers.length && !found; i++) {
          if(connectedUsers[i].username === conversation)
          {
              found = true;
          }
      }
      // if(!found) {
      //   window.localStorage.removeItem("conversation");
      //   this.setState({message_to: <None/>});
      //   this.change = true;
      // }
    }

    componentDidMount() {
      let obj = {
          username:  window.localStorage.getItem("username"),
      }
      Socket.emit("user_connected", obj);
      Socket.on("user_connection", this.new_user_event);
      Socket.on("new_user_event", this.new_user_event);
      //conversation reffers to the username the user last clicked: eg. user1234117
      const { conversation } = window.localStorage;
      if(conversation !== undefined &&
         conversation !== null &&
         conversation !== "")
         {
            this.setState({message_to: <Messages title={conversation}  socket={Socket}/>});
          }else{
            this.setState({message_to: <None/>});
         }
    }

    componentWillUnmount() {
      Socket.removeAllListeners();
    }

    render() {
      this.change = false;
      this.clickChange = false;
      return (
        <div id="content">
              <Header></Header>
              <Body className="body1">
                <Users onClick={this.userClick} socket={Socket} />
                {this.state.message_to}
              </Body>
              <Footer></Footer>
        </div>
      );
    }
}

export default Chat;