import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./login/main";
import Chat from "./chat/chat";

const AppRouter = () => {
    return (
        <Router>
            <Route path="/" exact component={Main} />
            <Route path="/chat" component={Chat} />
        </Router>
    );
}

export default AppRouter;