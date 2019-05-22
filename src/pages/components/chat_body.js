import React from 'react';
import "./css/chat_body.css";

class ChatBody extends React.Component {
    render() {
      return (
        <div className="body">
          {this.props.children}
        </div>
      );
    }
}

export default ChatBody; 