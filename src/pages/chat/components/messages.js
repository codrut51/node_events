import React, { Component } from 'react';
import "./css/messages.css"
import Button from '@material-ui/core/Button';
import Message from "./message";
export default class Messages extends Component {
    socket = null;
    state = {
        titleComponent: '',
        message: "",
        messages: []
    }

    constructor() {
        super();
        this.sendMessage = this.sendMessage.bind(this);
        this.receivedMessage = this.receivedMessage.bind(this);
        this.messages = this.messages.bind(this);
    }

    messages(obj) {

    }

    receivedMessage(obj) {

    }

    async sendMessage(event) {
        const { message } = this.state;
        const { title } = this.props;
        if(message !== null &&
           message !== undefined &&
           message !== "") {
                console.log(message);
                this.socket.emit(title, { 
                    message: message
                });
                this.setState({message: ""});
           }
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
                    <h2 id="message_title">Username: {this.props.title} </h2>
            }) 
            this.socket = this.props.socket;
            this.socket.on(title,this.messages)
            console.log(this.socket);
            for(let i = 0; i < 20; i++)
            {
                this.state.messages.push()
            }
        }
    }

    onChange(event) {
        // const { message } = this.state;
        this.setState({message: event.target.value});
    }

    render() {
        return (
            <div className="messages">
                <div className="messages_title">
                    {this.state.titleComponent}
                </div>
                <div className="messages_body">
                    {this.state.messages}
                </div>
                <div className="messages_input">
                    <input type="text" name="message" 
                           id="message"
                           value={this.state.message} 
                           onChange={(e) => this.onChange(e)}
                           />
                    <div className="button_placeholder">
                        <Button variant="contained" color="primary" className="message_button" onClick={(e) => this.sendMessage(e)} >
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}