import React, { Component } from 'react';
import "./css/messages.css"

export default class Messages extends Component {
    
    componentDidMount() {
    }

    render() {
        return (
            <div className="message">
                <p>{this.props.name}</p>
            </div>
        )
    }
} 