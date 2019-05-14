import React from 'react';
import "./css/users.css"
import User from "./user";
import { 
    Route,
    Redirect
} from "react-router-dom";

class Users extends React.Component {
    socket = null;
    state = {
        users: [],
        message: ''
    }

    constructor()
    {
        super();
        this.eventResponse = this.eventResponse.bind(this);
    }



    eventResponse(data) {
        const { connectedUsers } = data;
        console.log(connectedUsers);
        let users = [];
        connectedUsers.forEach(user => {
            if(user.username !== window.localStorage.getItem("username"))
            {
                let key = 0;
                if(users.length !== 0)
                {
                    key = parseInt(users[users.length - 1].key) + 1
                }
                users.push(<User key={key} name={user.username} onClick={this.props.onClick}/>)
                
            }
        });
        this.setState({users: users});
    }

    componentDidMount() { 
        // let arr = this.state.users;
        // for(let i = 0; i < 100; i++) {
        //     let name = "user12341"+i;
        //     arr.push(<User key={i} name={name} onClick={this.props.onClick}/>);
        // }
        // this.setState({users: arr});
        this.socket = this.props.socket;
        this.socket.on("user_connection", this.eventResponse);
        this.socket.on("new_user_event", this.eventResponse);
        // let usersClass = document.getElementsByClassName("users");
        // let users = null;
        // for(let i = 0; i < usersClass.length; i++) {
        //     users =  usersClass[i];
        //     break;
        // }
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