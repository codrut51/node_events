const io = require('socket.io')();
let users = [];
users.push("new_user");
io.on('connection', (socket) => {
    console.log("an user is connected!");
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    users.forEach(user => {
        socket.on(user, function(msg){
            io.emit('custom_event_response', msg);
        });
    });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);