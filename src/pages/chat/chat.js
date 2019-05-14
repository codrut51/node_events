import React from 'react';
import Header from '../components/header';
import Body from '../components/body';
import Users from "./components/users";
import Messages from "./components/messages";
import { Socket } from "./socket_io";

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

    async userClick(event) {
      let userName = event.data.name;
      console.log("Chat no: ",userName);
      window.localStorage.setItem("conversation",userName);
      let element = <Messages title={userName} socket={Socket}/>;
      await this.setState({message_to: "" });
      this.setState({message_to: element });
    }

    async new_user_event(data){
      const { connectedUsers } = data;
      const { conversation } = window.localStorage;
      let found = false;
        for(let i = 0; i < connectedUsers.length && !found; i++) {
            if(connectedUsers[i].username === conversation)
            {
                found = true;
            }
        }
        if(!found) {
          window.localStorage.removeItem("conversation");
          this.setState({message_to: <Messages/>});
        }
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
            this.setState({message_to: <Messages/>});
         }
    }

    render() {
      return (
        <div id="content">
            <div className="root" spacing={0}>
              <Header></Header>
              <Body>
                <Users onClick={this.userClick} socket={Socket} />
                {this.state.message_to}
              </Body>
              <Header></Header>
            </div>
        </div>
      );
    }
}

export default Chat;