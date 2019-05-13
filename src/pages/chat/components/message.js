import React, { Component } from 'react';
import "./css/message.css"

export default class Messages extends Component {
    
    componentDidMount() {
    }

    render() {
        return (
            <div className="rowMessage">
                <div className="message">
                    <p>{this.props.message}</p>
                </div>
            </div>
        )
    }
} 