import React from 'react';
import Header from '../components/header';
import Body from '../components/body';
import Login from "./login";

class Main extends React.Component {
 
  click_listener = (event) => {
    console.log("Here!");
  }
  componentDidMount() {
    document.addEventListener("click_event", this.click_listener);
  }
  render() {
    return (
      <div id="content">
        <div className="root">
            <Header></Header>
            <Body>
                <Login></Login>
            </Body>
            <Header></Header>
        </div>
      </div>
    );
  }
}

export default Main;