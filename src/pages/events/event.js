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

class GlobalEvent {
    static eventManager = null;
    constructor() {
        this.getInstance = GlobalEvent.getInstance.bind(this);
    }
    
    static getInstance() {
        if(this.eventManager == null) {
            this.eventManager = new EventManager();
        }
        return this.eventManager;
    } 
}

let globalEvent = new GlobalEvent();
let event = globalEvent.getInstance();

const addCustomEventListener = (event_name, callback) => {
    event.listen(event_name, callback);
}
const dispatchCustomEvent = (event_name, data) => {
    event.dispatch(event_name, data);
}

addCustomEventListener("click_listener")
export {addCustomEventListener, dispatchCustomEvent}