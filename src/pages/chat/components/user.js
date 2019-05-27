import React from 'react';
import "./css/user.css"

// export default class User extends Component { 

//     render() {
//         const { onClick, userObj } = this.props;
//         const {username, isConnected } = userObj;
//         let event = new CustomEvent("custom_click");
//         event.data = {
//             name: username,
//             class: this            
//         };

//         let clsName = "user";
//         if(!isConnected) {
//             clsName = "offline_user"
//         }
//         return (
//             <div className={clsName} onClick={() => onClick(event) }>
//                 <div className="user_text">{username}</div>
//             </div>
//         )
//     }
// } 

function User({name, isConnected, onClick }) {
    // const { onClick, userObj } = props;
    // const {username, isConnected } = userObj;

    let event = new CustomEvent("custom_click");
    event.data = {
        name: name,
        class: this            
    };
    // const updateConnect = () => {
    //     setConnected(true);
    // }
    // setConnected(isConnected);
   
    return (
        <div className={isConnected ? "user" : "offline_user"} onClick={() => onClick(event) }>
            <div className="user_text">{name}</div>
        </div>
    );
}

export { User };