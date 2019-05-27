import React, { useState, useEffect } from 'react';
import "./css/users.css"
import { User } from "./user";
import { 
    Route,
    Redirect
} from "react-router-dom";

// class Users extends React.Component {
//     socket = null;
//     state = {
//         users: new Array(),
//         message: ''
//     }

//     constructor()
//     {
//         super();
//         this.eventResponse = this.eventResponse.bind(this);
//     }
//     eventResponse(data) {
        // const { connectedUsers } = data;
        // let users = this.state.users;
        // connectedUsers.forEach(user => {
        //     if(user.username !== window.localStorage.getItem("username") &&
        //         user.username !== null)
        //     {
        //         let found = false;
        //         let index = -1;
        //         for(let i = 0; i < users.length; i++)
        //         {
        //             if(users[i].username === user.username){
        //                 found = true;
        //                 index = i;
        //                 break;
        //             }
        //         }
        //         if(found)
        //         {
        //             users[index] = { username: user.username, connected: user.isConnected};
        //         }else{
        //             users.push({ username: user.username, connected: user.isConnected}); //<User key={key} name={user.username} isConnected={this.state.users_status[user.username]} onClick={this.props.onClick}/>
        //         }
        //          // users[key].updateConnect();
        //     }
        // });
        // console.log(users instanceof Array);
        // if(users instanceof Array)
        // {
        //     this.setState({users: users});
        // }
//     }

//     componentDidMount() { 
        // // let arr = this.state.users;
        // // for(let i = 0; i < 100; i++) {
        // //     let name = "user12341"+i;
        // //     arr.push(<User key={i} name={name} onClick={this.props.onClick}/>);
        // // }
        // // this.setState({users: arr});
        // this.socket = this.props.socket;
        // this.socket.on("user_connection", this.eventResponse);
        // this.socket.on("new_user_event", this.eventResponse);
        // // let usersClass = document.getElementsByClassName("users");
        // // let users = null;
        // // for(let i = 0; i < usersClass.length; i++) {
        // //     users =  usersClass[i];
        // //     break;
        // // }
//     }

//     render() {
    //   return (
    //       <Route
    //         render={ props => window.localStorage.length === 0 ? 
    //                         <Redirect
    //                             to={{
    //                                 pathname:"/",
    //                             }}
    //                         /> : <React.Fragment>
    //                                 <h2 id="users_title">Users</h2>
    //                                 <div className="users_content">
    //                                     {this.state.users.forEach((user, index)=> (
    //                                         <User key={index} name={user} isConnected={this.state.users_status[user.username]} onClick={this.props.onClick}/>
    //                                     ))
    //                                     }
    //                                 </div>
    //                         </React.Fragment>
    //                 }
    //       />
    //   );
//     }
// }

function Users({ socket, onClick }) {
    const [users, setUsers] = useState([]); 

    const eventResponse = (data) => {
        const { connectedUsers } = data;
        connectedUsers.forEach(connectedUser => {
            if(connectedUser.username !== window.localStorage.getItem("username") &&
            connectedUser.username !== null)
            {
                let found = false;
                let index = -1;
                for(let i = 0; i < users.length && !found; i++)
                {
                    if(users[i].username === connectedUser.username){
                        found = true;
                        index = i;
                    }
                }
                if(found)
                {
                    const newUsers = [...users];
                    newUsers[index].connected = connectedUser.isConnected;
                    setUsers(newUsers);
                }else{
                    let name = connectedUser.username;
                    let newUsers = users;
                    newUsers.push({ username: name, connected: connectedUser.isConnected});
                    setUsers(newUsers);
                }
                 // users[key].updateConnect();
            }
        });
    }

    useEffect(() => {
        socket.on("user_connection", eventResponse);
        socket.on("new_user_event", eventResponse);
    });

    return (
        <Route
          render={ props => window.localStorage.length === 0 ? 
                          <Redirect
                              to={{
                                  pathname:"/",
                              }}
                          /> : <React.Fragment>
                                  <h2 id="users_title">Users</h2>
                                  <div className="users_content">
                                      {users.map((user, index) => (
                                          <User key={index} 
                                                name={user.username} 
                                                isConnected={user.connected} 
                                                onClick={onClick}
                                                />
                                      ))
                                      }
                                  </div>
                          </React.Fragment>
                  }
        />
    );
}
export default Users;