import React from 'react';
import "./css/login.css";
import Button from '@material-ui/core/Button';
import { 
    Route,
    Redirect
} from "react-router-dom";

export default class Login extends React.Component {
    state = {
        name: "",
        password: "",
        view: "",
        logged: false
    }

    loginClick(event) {
        if(document.getElementById("password").value !== null &&
           document.getElementById("username").value !== '' &&
           document.getElementById("username").value !== null  &&
           document.getElementById("password").value !== "" ) {
            let secret = "Yzc3YmQ1ZjA2YzE2MzY5NDc4MDdiMjcyNzRjMmM2MzYxZDc3MWIzZmE3OTA3NjQzMmMxNzJlOTRiMjczZTA4MDNhYTk0MTY0MzAzNmZhYmE5NzNjNzUyYWU0NTJlZTA5MTNmOWQzNzdjZTU4YzM3MzM0YThhYmYwYjg3M2FiZmQ=";
            let username = document.getElementById("username").value;
            let password =  window.btoa((document.getElementById("password").value + secret).substring(5,25));//document.getElementById("password").value);
            console.log("Username: ", username, " Password: ", password);
            document.getElementById("password").value = "";
            document.getElementById("username").value = "";
            window.localStorage.setItem("username", username);
            window.localStorage.setItem("logged", username);
            this.updateState();
           }else{
               alert("Please fill in username and/or password!");
           }
    }

    onChange(input) {
        switch(input) {
            case "name":
                this.setState({ name: document.getElementById("username").value });
                break;
            case "password": 
                this.setState({ password: document.getElementById("password").value });
                break;
            default:
                console.log("input doesn't match");
                break;
        }
    }
    updateState() {
        
        this.setState({view : (
            <Route
            render={ props => this.state.logged ? 
                            <Redirect
                                to={{
                                    pathname:"/chat",
                                }}
                            /> :
                            <div className="login">
                                <div className="title_placeholder">
                                    <h2 className="title">Login</h2>
                                </div>
                                <div className="input_placeholder">
                                    <span className="textfiled_placeholder">
                                        <input type="text" name="username" className="input" id="username" placeholder="Username" onChange={() => this.onChange('name')}/>
                                    </span>
                                    <span className="textfiled_placeholder">
                                        <input type="password" name="password" className="input" id="password" placeholder="Password" onChange={() => this.onChange('password')}/>
                                    </span>
                                </div>
                                <div className="textfiled_placeholder">
                                    <span className="btn_placeholder">
                                        <Button variant="contained" color="primary" className="button" onClick={() => this.loginClick(this)} >
                                            Register & Login
                                        </Button>
                                    </span>
                                </div>
                            </div>
                    }
          />)});
    }
    componentWillMount() {
        if(!this.state.logged)
        {
            let username = window.localStorage.getItem("username");
            if(username !== null &&
               username !== '') {
                   this.setState({ logged: true });
               }
        }
        this.updateState();
    }
    render() {
        return (
            <div>{this.state.view}</div>
        );
    }
}