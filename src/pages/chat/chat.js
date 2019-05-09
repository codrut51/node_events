import React from 'react';
import Header from '../components/header';
import Body from '../components/body';
import Users from "./components/users";


class Chat extends React.Component {
    render() {
      return (
        <div id="content">
          <div className="root" spacing={0}>
              <Header></Header>
              <Body>
                <Users/>
              </Body>
              <Header></Header>
          </div>
        </div>
      );
    }
}

export default Chat;