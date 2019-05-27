import openSocket from 'socket.io-client';
// const socket =  openSocket("http://localhost:8000");
// socket.on('custom_event_response', this.eventResponse);
// socket.emit('new_user', obj); 

class SocketClient {
    static socket = null;
    constructor()
    {
        this.getInstace = this.getInstace.bind(this);
    }

    getInstace()
    {
        if(this.socket == null) { 
            let host  = "http://localhost:5000";
            // let host = "https://socket-io-serve.herokuapp.com";
            this.socket = openSocket(host); 
        }
        return this.socket;
    }
}

const socketClient = new SocketClient();
const Socket = socketClient.getInstace();
export { Socket }