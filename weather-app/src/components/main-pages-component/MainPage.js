import React, {useState, useEffect} from 'react';
import './MainPage.css';
import Form from '../forms-component/Form';
import LoginButton from '../login-component/LoginButton';
import History from '../history-component/History';
import WeatherField from '../weather-component/WeatherField';

const API = 'http://api.weatherstack.com/current?access_key=c8f8a6be5b8fc1c09e0cc5de68450744&query=';
const FAPI = 'http://api.weatherstack.com/forecast?access_key=c8f8a6be5b8fc1c09e0cc5de68450744&query=fetch:ip&forecast_days=7&hourly=1&units=m';
const DEFAULT_QUERY = 'fetch:ip';
const UNIT ='units=m'

function MainPage() {
  const [visible, setformVisibility]= useState("hide");
  const [list, setSearchList] = useState([]);
  const [response, setQueryResponse] = useState([]);

  let count = 1;

  function apiCall(city=DEFAULT_QUERY) {
    const apiResponse = response;
    fetch(API+city+UNIT)
      .then(res => res.json())
      .then(
        (result) => {
          if (response.length <= 4){
            apiResponse.push(result);
            setQueryResponse({response: apiResponse});
          } else {
            response.shift();
            apiResponse.push(result);
            setQueryResponse({response: apiResponse});
          }
          
    console.log(response[0]);
        },
        (error) => {}
      )
  }
  
  function handleMouseDown(e) {
    count ++;
    if(count%2!==0) {
      setformVisibility("show");
    }else{
      setformVisibility("hide");
    }
    
    console.log("clicked " + visible);
    e.stopPropagation();
  }
  
  function search(e) {
    e.preventDefault();
    let query = list;
    const newItem = document.getElementById("addInput");
    const form = document.getElementById("addItemForm");
    if (newItem.value !== "") {
      if (list.length <= 4){
        list.push(newItem.value);
        setSearchList({list: query});
        form.reset();
      } else {
        list.shift();
        list.push(newItem.value);
        setSearchList({list: list});
        form.reset();
      }
    } else {
      newItem.classList.add("is-danger");
    }
    console.log(response);
  }

  useEffect(() => {
    const resent_search = list.length-1;
    if(list.length !== 0){
      apiCall();
    } else{
      apiCall(resent_search);
    }
  },[]);

  return (
    <div>
      <Form className='theForm' handleMouseDown={handleMouseDown} menuVisibility={visible} />
    
      <div className='grid-container'>

        <LoginButton className="theButton" handleMouseDown={handleMouseDown} />

        <div className= 'search'>

          <form className="form" id="addItemForm" role="search">
            <input className="fsearch" type="search" placeholder="Search..." id="addInput" required />
            <button className="button" type="submit" onClick={search}>Go</button>    
          </form>

          <WeatherField className= 'main' weather={response[0]}/>

        </div>

        {list.length===0 ? <p className='nohis'>No Search History</p> : <History result={list} />}

      </div>

    </div>
    );

}

/* class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      visible: false,
      list: [],
      response: [],
      forcast: []
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
            apiResponse.push(result);
            this.setState({response: apiResponse, isLoaded:true});
          } else {
            this.state.response.shift();
            apiResponse.push(result);
            this.setState({response: apiResponse, isLoaded:true});
          }
          
    console.log(this.state.response[0]);
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

            <WeatherField className= 'main' weather={this.state.response[0]}/>

          </div>

          {this.state.list.length===0 ? <p className='nohis'>No Search History</p> : <History result={this.state.list} />}

        </div>

      </div>
      );
  }
} */

export default MainPage;