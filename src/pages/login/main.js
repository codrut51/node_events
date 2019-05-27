import React from 'react';
import Header from '../components/header';
<<<<<<< HEAD
import Footer from '../components/footer';
import Body from '../components/body';
import Login from "./login";
import "../css/main.css";
=======
import Body from '../components/body';
import Login from "./login";
>>>>>>> 83fc5771b866034d5f81536561989ffdce578583

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
<<<<<<< HEAD
        <Header></Header>
        <Body> 
          <Login></Login>
        </Body>
        <Footer></Footer>
=======
        <div className="root">
            <Header></Header>
            <Body> 
                <Login></Login>
            </Body>
            <Header></Header>
        </div>
>>>>>>> 83fc5771b866034d5f81536561989ffdce578583
      </div>
    );
  }
}

<<<<<<< HEAD
/*
<div className="root">
<Header></Header>
<Body> 
    <Login></Login>
</Body>
<Header></Header>
</div> */
=======
>>>>>>> 83fc5771b866034d5f81536561989ffdce578583
export default Main;