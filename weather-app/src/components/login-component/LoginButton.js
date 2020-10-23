import React from "react";
import './LoginButton.css';

export function LogOutButton(props){
  const logButton = {
    effect:props.unLog(false),
    name:"LOGOUT"
  }
  return (
    <button id="loginButton" onClick={logButton.effect}>{logButton.name}</button>
  );
}


export default function LoginButton(props){
    const logButton = {
      effect:props.onClick,
      name:"LOGIN"
    }
    return (
      <button id="loginButton" onClick={logButton.effect}>{logButton.name}</button>
    );
}