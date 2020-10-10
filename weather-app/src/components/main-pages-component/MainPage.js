import React, {Component} from 'react';
import './MainPage.css';
import Form from '../forms-component/Form';
import LoginButton from '../login-component/LoginButton';
import History from '../history-component/History';
import WeatherField from '../weather-component/WeatherField';

const API = 'http://api.weatherstack.com/current?access_key=c8f8a6be5b8fc1c09e0cc5de68450744&query=';
const DEFAULT_QUERY = 'fetch:ip';
const UNIT ='units=m'

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      visible: false,
      list: [],
      response: []
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.search = this.search.bind(this);
    this.apiCall = this.apiCall.bind(this);
  }

  componentDidMount() {
    const resent_search = this.state.list.length-1;
    if(this.state.list.length !== 0){
      this.apiCall();
    } else{
      this.apiCall(resent_search);
    }
    console.log(this.state.response);
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

  apiCall(city=DEFAULT_QUERY) {
    const apiResponse = this.state.response;
    fetch(API+city+UNIT)
      .then(res => res.json())
      .then(
        (result) => {
          if (this.state.response.length <= 4){
            apiResponse.push(result.current);
            this.setState({response: apiResponse, isLoaded:true});
          } else {
            this.state.list.shift();
            apiResponse.push(result.current);
            this.setState({response: apiResponse, isLoaded:true});
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  search(e) {
    e.preventDefault();
    let list = this.state.list;
    const newItem = document.getElementById("addInput");
    const form = document.getElementById("addItemForm");
    if (newItem.value !== "") {
      if (list.length <= 4){
        list.push(newItem.value);
        this.setState({list: list});
        form.reset();
      } else {
        list.shift();
        list.push(newItem.value);
        this.setState({list: list});
        form.reset();
      }
    } else {
      newItem.classList.add("is-danger");
    }
    console.log(this.state.response);
  }

  render(){
    return (
      <div>
        <Form className='theForm' handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible}/>
      
        <div className='grid-container'>

          <LoginButton className="theButton" handleMouseDown={this.handleMouseDown}/>

          <div className= 'search'>

            <form className="form" id="addItemForm" role="search">
              <input className="fsearch" type="search" placeholder="Search..." id="addInput" required />
              <button className="button" type="submit" onClick={this.search}>Go</button>    
            </form>

            <WeatherField className= 'main'/>

          </div>

          {this.state.list.length===0 ? <p className='nohis'>No Search History</p> : <History result={this.state.list} />}

        </div>

      </div>
      );
  }
}

export default MainPage;