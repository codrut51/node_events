import React from 'react';

class Body extends React.Component {
    clickMe(event) {
      let event1 = new Event('click_event', {component: this});
      dispatchEvent(event1);
      console.log(event);
    }
    render() {
      return (
        <div className="body" onClick={this.clickMe.bind(this)}>
            <div className="body_left_side" >
            </div>
            <div className="body_right_side">
            </div>
        </div>
      );
    }
}

export default Body;