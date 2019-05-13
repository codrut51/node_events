import React, { Component } from 'react';
import "./css/messages.css"

export default class Messages extends Component {
    state = {
        titleComponent: ''
    }
    componentDidMount(){
        const { title } = this.props;
        console.log(title);
        if(title !== null &&
           title !== '' &&
           title !== undefined)
           {
               this.setState({
                   titleComponent: 
                   <div className="messages_title">
                       <h2 id="message_title">Username: {this.props.title} </h2>
                   </div>
               })
           }
    }
    render() {
        return (
            <div className="messages">
                {this.state.titleComponent}
            </div>
        )
    }
}