import React, { Component } from "react";
import './LoginButton.css';

class LoginButton extends Component {
  render() {
    return (
      <button id="loginButton" onClick={this.props.onClick}>LOGIN</button>
    );
  }
}

export default LoginButton;