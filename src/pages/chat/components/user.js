import React, { Component } from 'react';
import "./css/user.css"

export default class User extends Component {
    constructor() {
        super();
        this.clickEvent = this.clickEvent.bind(this);
    }

    clickEvent() {
        let userClass = document.getElementsByClassName("user");
        let user = null;
        for(let i = 0; i < userClass.length; i++) {
            user =  userClass[i];
            break;
        }
       user.dispatchEvent(new Event("click_user", {user: this.props.name }));
    }

    render() {
        return (
            <div className="user" onClick={this.clickEvent}>
                <p>{this.props.name}</p>
            </div>
        )
    }
}