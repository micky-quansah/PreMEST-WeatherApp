import React, {Component} from 'react';
import './MainPage.css';
import Form from '../forms-component/Form';
import LoginButton from '../login-component/LoginButton';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleMouseDown(e) {
    this.toggleMenu();

    console.log("clicked " + this.state.visible);
    e.stopPropagation();
  }

  toggleMenu() {
    this.setState({
        visible: !this.state.visible
    });
  }

  render(){
    return (
      <>
      <LoginButton className="theButton" handleMouseDown={this.handleMouseDown}/>
      <Form className='theForm' handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible}/>
      </>
      );
  }
}

export default MainPage;