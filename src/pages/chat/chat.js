import React from 'react';
import Header from '../components/header';
import Body from '../components/body';
import Users from "./components/users";
import Messages from "./components/messages";


class Chat extends React.Component {

    state = {
      message_to: "",
    }
    constructor() {
      super();
      this.userClick = this.userClick.bind(this);
    }

    async userClick(event) {
      let userName = event.data.name;
      await this.setState({message_to: ""})
      this.setState({message_to: <Messages title={userName}/>}, () => {
        console.log("state changed!");
      })
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