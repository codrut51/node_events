const io = require('socket.io')();

const User = (name, password) => {
    let obj = {
        username: name,
        password: password
    }
    return obj;
}

let users = [];
io.on('connection', (socket) => {
    console.log("a user is connected!");
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on("new_user", function(msg){
        let exists = false;
        users.forEach(elmnt => {
            if(elmnt.username === msg.username)
            {
                exists = true;
            }
        });
        if(!exists)
        {
            users.push(User(msg.name,msg.password));
            io.emit('new_user_event', msg);
        }
    }); 
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);