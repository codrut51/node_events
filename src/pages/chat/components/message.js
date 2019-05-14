import React, { Component } from 'react';
import "./css/message.css"

export default class Messages extends Component {
    state = {
        className: "other"
    }

    componentDidMount() {
        const { name } = this.props;
        if(name !== null &&
           name !== "" &&
           name !== undefined){
                this.setState({className: name});
           }
    }

    render() {
        return (
            <div className="rowMessage">
                <div className={this.state.className}>
                    <p>{this.props.message}</p>
                </div>
            </div>
        )
    }
} 