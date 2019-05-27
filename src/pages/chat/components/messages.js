import React, { Component } from 'react';
import "./css/messages.css"
import Button from '@material-ui/core/Button';
import Message from "./message";

function addslashes(str) {
    // eslint-disable-next-line
    str = str.replace(/\\/g, '\\\\');
    // eslint-disable-next-line
    str = str.replace(/\'/g, '\\\'');
    // eslint-disable-next-line
    str = str.replace(/\"/g, '\\"');
    // eslint-disable-next-line
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
        messages: [],
        message_state: ""
    }
    mounted = null;
    constructor() {
        super();
        this.sendMessage = this.sendMessage.bind(this);
        this.receivedMessage = this.receivedMessage.bind(this);
        this.receiveState = this.receiveState.bind(this);
    }

    receiveState(obj) {
        if(obj.typing !== undefined)
        {
            if(obj.typing) {
                this.setState({message_state: null}, () => {
                    this.setState({message_state: "typing..."});
                });
            }else{
                this.setState({message_state: null}, () => {
                    this.setState({message_state: ""});
                });
            }
        }
        // this.setState({titleComponent: null}, () => {
        //     this.setState({titleComponent: 
        //         <div className="message_title_placeholder">
        //             <div className="message_title_icon">
        //                 <svg xmlns="http://www.w3.org/2000/svg" className="message_title_icon1" viewBox="0 0 24 24">
        //                     <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/>
        //                 </svg>
        //             </div>
        //             <div className="message_title_details"> 
        //                 <div className="message_title_username">
        //                     <h3 id="message_title">Username: {this.props.title} </h3>
        //                 </div>
        //                 <div className="message_title_status">
        //                     <p>{this.state.message_state}</p>
        //                 </div>
        //             </div>
        //         </div>});
        // });
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

    sendMessage() {
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
        if(this.mounted)
        {
            let messages_body = document.getElementById("messages_body");
            messages_body.scrollTop = messages_body.scrollHeight;
        }
    }

    componentDidMount(){
        this.mounted = true;
        const { title } = this.props;
        if(title !== null &&
           title !== '' &&
           title !== undefined)
        {
            this.setState({
                titleComponent: 
                    <div className="message_title_placeholder">
                        <div className="message_title_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" className="message_title_icon1" viewBox="0 0 24 24">
                                <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                        </div>
                        <div className="message_title_details"> 
                            <div className="message_title_username">
                                <h3 id="message_title">Username: {this.props.title} </h3>
                            </div>
                            <div className="message_title_status">
                                <p>{this.state.message_state}</p>
                            </div>
                        </div>
                    </div>
            });
            this.socket = this.props.socket;
            this.socket.on(window.localStorage.getItem("username")+"_"+title,this.receivedMessage);
            this.socket.on(`typing_${window.localStorage.getItem("username")}_${title}`,this.receiveState);
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
          } else {
              let obj = {
                  from: window.localStorage.getItem("username"),
                  to: title,
                  username: window.localStorage.getItem("username")
                };
              this.socket.emit("typing", obj);
          }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
        window.removeEventListener("keydown", (event) => {});
        const { title } = this.props;
        if(title !== null &&
           title !== '' &&
           title !== undefined)
        {
            this.socket.removeAllListeners();
        }
    }

    onChange(event) {
        // const { message } = this.state;
        this.setState({message: event.target.value});
    }

    render() {
        return (
            <React.Fragment>
                <div className="message_title">
                    <svg xmlns="http://www.w3.org/2000/svg" id="message_picture" viewBox="0 0 24 24">
                        <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/><path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                    <div className="user_details">
                        <h3 id="user_title">User: {this.props.title}</h3>
                        <h5 id="user_message_status">{this.state.message_state}</h5>
                    </div>
                </div>
                <div id="messages_body">
                    {this.state.messages}
                </div>
                <div id="input_fields">
                    <input type="text" name="message" 
                                id="messages_input"
                                value={this.state.message} 
                                onChange={(e) => this.onChange(e)}
                                />
                    <Button variant="contained" color="primary" className="message_button" onClick={(e) => this.sendMessage(e)} >
                        <p className="message_button1">Send</p>
                    </Button>
                </div>
            </React.Fragment>
        )
    }
}
/*

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
            */
