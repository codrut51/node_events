import React from 'react';
import "./css/users.css"
import openSocket from 'socket.io-client';
import User from "./user";
import {addCustomEventListener , dispatchCustomEvent} from "../../events/event";
import { 
    Route,
    Redirect
} from "react-router-dom";

class Users extends React.Component {

    state = {
        users: [],
    }

    constructor()
    {
        super();
        this.eventResponse = this.eventResponse.bind(this);
        this.userClick = this.userClick.bind(this);
    }

    userClick(event) {
        console.log(event);
    }
    eventResponse(msg) {
        if(msg.user === window.localStorage.getItem("username"))
        {
            let arr = this.state.users ? [] : this.state.users;
            arr.push(msg.user);
            this.setState({users: this.state.users });
        }
    }

    async componentDidMount() {
        let arr = this.state.users;
        for(let i = 0; i < 100; i++) {
            let name = "user12341"+i;
            arr.push(<User key={i} name={name}/>);
        }
        this.setState({users: arr});
        let socket =  openSocket("http://localhost:8000");
        let obj = {
            'user':  window.localStorage.getItem("username"),
        }
        socket.on('custom_event_response', this.eventResponse);
        socket.emit('new_user', obj); 
        let usersClass = document.getElementsByClassName("users");
        let users = null;
        for(let i = 0; i < usersClass.length; i++) {
            users =  usersClass[i];
            break;
        }
        addCustomEventListener("user_click", this.userClick);
    }

    render() {
      return (
          <Route
            render={ props => window.localStorage.length === 0 ? 
                            <Redirect
                                to={{
                                    pathname:"/",
                                }}
                            /> : <div className="users">
                                    <div className="users_title">
                                        <h2>Users</h2>
                                    </div>
                                    <div className="users_content">
                                        {this.state.users}
                                    </div>
                            </div>
                    }
          />
      );
    }
}

export default Users;