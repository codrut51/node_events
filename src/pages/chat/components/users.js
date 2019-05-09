import React from 'react';
import "./css/users.css"
import openSocket from 'socket.io-client';
import { 
    Route,
    Redirect
} from "react-router-dom";

class Users extends React.Component {

    async componentDidMount() {
        let socket =  openSocket("http://localhost:8000");
        let obj = {
            'user':  window.localStorage.getItem("username"),
        }
        socket.on('custom_event_response', (msg) => {
            console.log(msg);
        });
        socket.emit('new_user', obj); 
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
                            
                            </div>
                    }
          />
      );
    }
}

export default Users;