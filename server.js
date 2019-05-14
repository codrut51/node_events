const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const User = (name, connected) => {
    let obj = {
        username: name,
        isConnected: connected
    }
    return obj;
}

let users = [];
io.on('connection', (socket) => {
    socket.on('disconnect', function(){
        console.log('user disconnected');
        console.log(socket.id);
        let found = false;
        for(let i = 0; i < users.length && !found; i++) {
            if(users[i].username === socket.id)
            {
                found = true;
                users[i] = User(socket.id, false);
            }
        }
        let connectedUsers = [];
        users.forEach(user => {
            if(user.isConnected)
            {
                connectedUsers.push(user);
            }
        });
        io.emit('user_connection', {
            connectedUsers: connectedUsers
        });
    });
    socket.on("user_connected", function(data) {
        console.log("a user is connected!");
        let exists = false;
        users.forEach(elmnt => {
            if(elmnt.username === data.username)
            {
                exists = true;
            }
        });
        if(!exists)
        {   let user = User(data.username, true);
            users.push(user);
            let connectedUsers = [];
            users.forEach(user => {
                if(user.isConnected)
                {
                    connectedUsers.push(user);
                }
            });
            socket.id = data.username;
            io.emit('new_user_event', {
                connectedUsers: connectedUsers
            });
        } else {
            let found = false;
            
            for(let i = 0; i < users.length && !found; i++) {
                if(users[i].username === data.username)
                {
                    found = true;
                    users[i] = User(data.username, true);
                    console.log(users[i]);
                }
            }
            let connectedUsers = [];
            users.forEach(user => {
                if(user.isConnected)
                {
                    connectedUsers.push(user);
                }
            });
            socket.id = data.username;
            io.emit('user_connection', {
                connectedUsers: connectedUsers
            });
        }
    });

    socket.on("chat_messages", function(data) {
        io.emit(data.to, {
            message: data.message
        });
    });
});

const PORT = 5000;
http.listen(PORT, () => console.log(`Listening on http://localhost:${ PORT }`));