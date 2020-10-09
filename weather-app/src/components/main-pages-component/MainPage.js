import React, {Component} from 'react';
import './MainPage.css';
import Form from '../forms-component/Form';
import LoginButton from '../login-component/LoginButton';
import History from '../history-component/History';
import WeatherField from '../weather-component/WeatherField';

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
    let list = this.state.list;
    const newItem = document.getElementById("addInput");
    const form = document.getElementById("addItemForm");
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
      <div>
        <Form className='theForm' handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible}/>
      
        <div className='grid-container'>

          <LoginButton className="theButton" handleMouseDown={this.handleMouseDown}/>

          <div className= 'search'>

            <form className="form" id="addItemForm" role="search">
              <label for="search" className="label">Search Location</label>
              <input className="search" id="search" type="search" placeholder="Search..." id="addInput" autofocus required />
              <button className="button" type="submit" onClick={this.search}>Go</button>    
            </form>

            <WeatherField className= 'main'/>

          </div>

          <History result={this.state.list} />

        </div>

      </div>
      );
  }
}

export default MainPage;