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
            const host = process.env.HOST || "212.178.84.26";
            this.socket = openSocket("http://"+host+":5000");
        }
        return this.socket;
    }
}

const socketClient = new SocketClient();
const Socket = socketClient.getInstace();
export { Socket }