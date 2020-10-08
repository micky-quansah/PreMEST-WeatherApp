import React, { Component } from "react";
import './LoginButton.css';

class LoginButton extends Component {
  render() {
    return (
      <button id="loginButton" onMouseDown={this.props.handleMouseDown}>LOGIN</button>
    );
  }
}

export default LoginButton;