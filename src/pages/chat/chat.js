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

    new_user_event(object){
      console.log(object.user);
    }

    componentDidMount() {
      console.log("here!");
      const { conversation } = window.localStorage;
      if(conversation !== undefined &&
         conversation !== null &&
         conversation !== "")
         {
            Socket.on("new_user_event",this.new_user_event);
            let obj = {
                'user':  window.localStorage.getItem("username"),
            }
            Socket.emit("new_user", obj);
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
                <Users onClick={this.userClick}/>
                {this.state.message_to}
              </Body>
              <Header></Header>
            </div>
        </div>
      );
    }
}

export default Chat;