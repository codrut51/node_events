import React, { Component } from 'react';
import "./css/messages.css"
import Button from '@material-ui/core/Button';
import Message from "./message";

function addslashes(str) {
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/\'/g, '\\\'');
    str = str.replace(/\"/g, '\\"');
    str = str.replace(/\0/g, '\\0');
    return str;
}
 
// function stripslashes(str) {
//     str = str.replace(/\\'/g, '\'');
//     str = str.replace(/\\"/g, '"');
//     str = str.replace(/\\0/g, '\0');
//     str = str.replace(/\\\\/g, '\\');
//     return str;
// }


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
    }

    receivedMessage(obj) {
        const { message } = obj;
        let custMessage = addslashes(message);
        let key = 0;
        if(this.state.messages.length !== 0){
            key = parseInt(this.state.messages[this.state.messages.length - 1].key) + 1;
        }
        this.state.messages.push(<Message key={key} message={custMessage}/>)
        this.setState({messages: this.state.messages});
    }

    async sendMessage() {
        const { message } = this.state;
        const { title } = this.props;
        if(message !== null &&
           message !== undefined &&
           message !== "" &&
           title !== null &&
           title !== undefined &&
           title !== "") {
                this.socket.emit("chat_messages", { 
                    to: title+"_"+window.localStorage.getItem("username"),
                    message: message
                });
                let custMessage = addslashes(message);
                let key = 0;
                if(this.state.messages.length !== 0){
                    key = parseInt(this.state.messages[this.state.messages.length - 1].key) + 1;
                }
                this.state.messages.push(<Message key={key} message={custMessage} name="me"/>);
                this.setState({message: ""});
                this.setState({messages: this.state.messages});
           }
    }
    componentDidUpdate() {
        let messages_body = document.getElementById("messages_body");
        messages_body.scrollTop = messages_body.scrollHeight;
    }
    componentDidMount(){
        const { title } = this.props;
        if(title !== null &&
           title !== '' &&
           title !== undefined)
        {
            this.setState({
                titleComponent: 
                    <h2 id="message_title">Username: {this.props.title} </h2>
            }) 
            this.socket = this.props.socket;
            this.socket.on(window.localStorage.getItem("username")+"_"+title,this.receivedMessage);
            // for(let i = 100; i < 190; i++)
            // {
            //     let message = "Vivamus ac eros eleifend, commodo erat ut, elementum eros. Morbi ornare tortor sed elit viverra, nec commodo tortor lobortis. Nulla nec elementum tortor. Phasellus diam libero, vestibulum ac pharetra et, imperdiet id risus. Aenean tincidunt quam eu egestas faucibus. Donec gravida neque at ullamcorper dignissim. In finibus, nunc in finibus feugiat, erat eros vehicula leo, nec suscipit augue mi eget lectus."+i;
            //     this.state.messages.push(<Message key={i} message={message} name="other"/>);
            //     this.setState({messages: this.state.messages })
            // }
            // let message = "Vivamus ac eros eleifend, commodo erat ut, elementum eros. Morbi ornare tortor sed elit viverra, nec commodo tortor lobortis. Nulla nec elementum tortor. Phasellus diam libero, vestibulum ac pharetra et, imperdiet id risus. Aenean tincidunt quam eu egestas faucibus. Donec gravida neque at ullamcorper dignissim. In finibus, nunc in finibus feugiat, erat eros vehicula leo, nec suscipit augue mi eget lectus."+190;
            // this.state.messages.push(<Message key={190} message={message} name="me"/>);
            // this.setState({messages: this.state.messages });
        }
        window.addEventListener("keydown", (event) => {
          const { keyCode } = event;
          if(keyCode === 13)
          { 
                this.sendMessage();
          }
        });
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
                <div id="messages_body">
                    {this.state.messages}
                </div>
                <div className="messages_input">
                    <div className="input_fields">
                        <input type="text" name="message" 
                            id="message"
                            value={this.state.message} 
                            onChange={(e) => this.onChange(e)}
                            />
                        <div className="button_placeholder">
                            <Button variant="contained" color="primary" className="message_button" onClick={(e) => this.sendMessage(e)} >
                                <p className="message_button1">Send</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}