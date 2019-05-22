import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Body from '../components/body';
import Login from "./login";
import "../css/main.css";

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
        <Header></Header>
        <Body> 
          <Login></Login>
        </Body>
        <Footer></Footer>
      </div>
    );
  }
}

/*
<div className="root">
<Header></Header>
<Body> 
    <Login></Login>
</Body>
<Header></Header>
</div> */
export default Main;