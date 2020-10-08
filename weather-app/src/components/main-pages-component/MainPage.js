import React, {Component, useState} from 'react';
import './MainPage.css';
import Form from '../forms-component/Form';
import LoginButton from '../login-component/LoginButton';
import History from '../history-component/History'

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.state = { list: ["Accra"]}

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.search = this.search.bind(this);
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

  search(e) {
    e.preventDefault();

    // Create variables for our list, the item to add, and our form
    let list = this.state.list;
    const newItem = document.getElementById("addInput");
    const form = document.getElementById("addItemForm");

    // If our input has a value
    if (newItem.value !== "") {
      list.push(newItem.value);
      this.setState({list: list});
      form.reset();
    } else {
      newItem.classList.add("is-danger");
    }
  }

  render(){
    return (
      <>
      <LoginButton className="theButton" handleMouseDown={this.handleMouseDown}/>
      <Form className='theForm' handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible}/>

      <div>
      <section className="section">
        <form className="form" id="addItemForm">
          <input type="text" className="input" id="addInput" placeholder="Enter City Name..." />
          <button onClick={this.search} >Search</button>
        </form>
      </section>
      </div>
      <History result={this.state.list} />

      </>
      );
  }
}

export default MainPage;