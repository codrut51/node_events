import React from 'react';
<<<<<<< HEAD
import "../css/login.css";
=======
import "./css/login.css";
import Button from '@material-ui/core/Button';
>>>>>>> 83fc5771b866034d5f81536561989ffdce578583
import { 
    Route,
    Redirect
} from "react-router-dom";

export default class Login extends React.Component {
    state = {
        username: "",
        password: "",
        view: "",
        logged: false
    }

    constructor()
    {
        super();
        this.loginClick = this.loginClick.bind(this);
    }

    loginClick(event) {
        const { username, password } = this.state;
        if(username !== null &&
           username !== '' &&
           password !== null  &&
           password !== "" ) {
               
            this.setState({logged : true});
            let secret = "Yzc3YmQ1ZjA2YzE2MzY5NDc4MDdiMjcyNzRjMmM2MzYxZDc3MWIzZmE3OTA3NjQzMmMxNzJlOTRiMjczZTA4MDNhYTk0MTY0MzAzNmZhYmE5NzNjNzUyYWU0NTJlZTA5MTNmOWQzNzdjZTU4YzM3MzM0YThhYmYwYjg3M2FiZmQ=";
            let username = document.getElementById("username").value;
            let password =  window.btoa((document.getElementById("password").value + secret).substring(5,25));//document.getElementById("password").value);
            console.log("Username: ", username, " Password: ", password);
            this.setState({username: "", password: ""});
            window.localStorage.setItem("username", username);
            window.localStorage.setItem("logged", username);
           }else{ 
               alert("Please fill in username and/or password!");
           }
    }

    onChange(input, event) {
        switch(input) {
            case "name":
                this.setState({ username: event.target.value});
                break;
            case "password": 
                this.setState({ password: event.target.value});
                break;
            default:
                console.log("input doesn't match");
                break;
        }
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
    }
    
    render() {
        return (   <Route
            render={ props => this.state.logged ? 
                            <Redirect
                                to={{
                                    pathname:"/chat",
                                }}
                            /> :
                            <div className="login">
<<<<<<< HEAD
                                <h2 className="title">Login</h2>
                                <input type="text" name="username"  
                                        className="input"
                                        id="username" value={this.state.username} 
                                        placeholder="Username" 
                                        onChange={(e) => this.onChange('name', e)}/>
                                <input type="password" name="password"
                                        id="password" value={this.state.password} 
                                        placeholder="Password"  
                                        className="input"
                                        onChange={(e) => this.onChange('password', e)}/>
                                <button variant="contained" color="primary" className="button" onClick={(e) => this.loginClick(e)} >
                                    Register & Login
                                </button>
=======
                                <div className="title_placeholder">
                                    <h2 className="title">Login</h2>
                                </div>
                                <div className="input_placeholder">
                                    <span className="textfiled_placeholder">
                                        <input type="text" name="username" className="input" 
                                               id="username" value={this.state.username} 
                                               placeholder="Username" 
                                               onChange={(e) => this.onChange('name', e)}/>
                                    </span>
                                    <span className="textfiled_placeholder">
                                        <input type="password" name="password" className="input" 
                                               id="password" value={this.state.password} 
                                               placeholder="Password" 
                                               onChange={(e) => this.onChange('password', e)}/>
                                    </span>
                                </div>
                                <div className="textfiled_placeholder">
                                    <span className="btn_placeholder">
                                        <Button variant="contained" color="primary" className="button" onClick={(e) => this.loginClick(e)} >
                                            Register & Login
                                        </Button>
                                    </span>
                                </div>
>>>>>>> 83fc5771b866034d5f81536561989ffdce578583
                            </div>
                    }
          />
        );
    }
}