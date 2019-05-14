import React, { Component } from 'react';
import "./css/messages.css"

export default class None extends Component {
    state = {
        className: "other"
    }

    componentDidMount() {
        const { name } = this.props;
        if(name !== null &&
           name !== "" &&
           name !== undefined){
                this.setState({className: name});
           }
    }

    render() {
        return (
           
            <div className="messages">
                <div className="messages_title">
                </div>
                <div id="messages_body">
                </div>
                <div className="messages_input">
                </div>
            </div>
        )
    }
} 