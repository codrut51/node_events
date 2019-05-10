class EventManager {
    listeners = {}
    constructor() {
        this.listen = this.listen.bind(this);
        this.dispatch = this.dispatch.bind(this);
    }

    listen(event, callback) {
        this.listeners[event] = []
        this.listeners[event].push(callback);
    }

    dispatch(event, data) {
        this.listeners[event].forEach(element => {
                element(data);
        });
    }
}

let event = new EventManager();


function listenEvent(data) {
    console.log(data);
}


const addCustomEventListener = (event_name, callback) => {
    event.listen(event_name, callback);
}
const dispatchCustomEvent = (event_name, data) => {
    event.dispatch(event_name, data);
}
export {addCustomEventListener, dispatchCustomEvent}