import React from 'react';
import "./css/body.css";

class Body extends React.Component {
    render() {
      const {className} = this.props;
      return (
        <div className={className}>
          {this.props.children}
        </div>
      );
    }
}

export default Body; 