import React, { Component } from 'react';
import "./css/user.css"

export default class User extends Component { 

    render() {
        const { onClick, name } = this.props;
        let event = new CustomEvent("custom_click");
        event.data = {
            name: this.props.name,
            class: this            
        };
        return (
            <div className="user" onClick={() => onClick(event) }>
                <p>{name}</p>
            </div>
        )
    }
} 