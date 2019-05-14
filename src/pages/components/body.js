import React from 'react';
import "./css/body.css";

class Body extends React.Component {
    render() {
      return (
        <div className="body">
          {this.props.children}
        </div>
      );
    }
}

export default Body; 