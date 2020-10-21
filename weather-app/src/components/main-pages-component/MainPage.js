import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './MainPage.css';
import Form from '../forms-component/Form';
import LoginButton from '../login-component/LoginButton';
import History from '../history-component/History';
import WeatherField from '../weather-component/WeatherField';


//const FAPI = 'http://api.weatherstack.com/forecast?access_key=c8f8a6be5b8fc1c09e0cc5de68450744&query=fetch:ip&forecast_days=7&hourly=1&units=m';

function  MainPage() {
  const [visible, setformVisibility]= useState("hide");
  const [click, setclick]= useState(false);
  const [url, setUrl] = useState('http://api.weatherstack.com/current?access_key=c8f8a6be5b8fc1c09e0cc5de68450744&query=fetch:ip&units=m');
  const [query, setQuery] = useState({value:'fetch:ip'});
  const [isError, setIsError] = useState(false);
  //const [apiResult, setApiResult] = useState([])

  const apiResult = [];

  let loading = false;

  const fetchData = async () => {
    setIsError(false);
    loading = true;

    console.log(url)

    try {
      const result = await axios(url);
      const {data} = result;
      const {current, location} = await data;
      const {temperature, humidity, weather_descriptions, weather_icons} = await current;
      const {name, country} = await location;

      const resObject = {
        temperature: temperature,
        humidity: humidity,
        descriptions: weather_descriptions[0],
        weather_icons: weather_icons[0],
        name: name,
        country: country
      }
      if (apiResult.length <= 5){
        apiResult.push(resObject);
      } else {
        apiResult.shift();
        apiResult.push(resObject);
      }

    } catch (error) {
      setIsError(true);
    }

    loading = false;
  };

  useEffect(() => {
    fetchData();
  },[url]);

  console.log(apiResult);
  
  function handleMouseDown(e) {
    setclick(!click);
    if(click===true) {
      setformVisibility("show");
    }else{
      setformVisibility("hide");
    }
    
    console.log("clicked " + visible);
    e.stopPropagation();
  }

  function handleQuery(e) {
    setQuery({value: e.target.value})
  }

  function handleSearch(e) {
    e.preventDefault();
    setUrl(`http://api.weatherstack.com/current?access_key=c8f8a6be5b8fc1c09e0cc5de68450744&query=${query.value}&units=m`);
    fetchData();
  }

  return (
    <div>
      <Form className='theForm' handleMouseDown={handleMouseDown} menuVisibility={visible} />
    
      <div className='grid-container'>

        <LoginButton className="theButton" handleMouseDown={handleMouseDown} />

        <div className= 'search'>

          <form className="form" id="addItemForm" role="search">
            <input className="fsearch" 
              type="search"
              value={query.value}
              onChange={handleQuery}
              placeholder="Search..." 
              id="addInput" 
              required />
            <button className="button" type="submit" onClick={handleSearch}>Go</button>    
          </form>

          {isError ? (<div className='mmain'>Something went wrong ...</div>) :
            loading ? 
              (<div className='mmain'>Loading ...</div>) : 
              (<div className='main'>
              <div className='fade-in one '>
                <div className='box'>Location: { apiResult?.name }
                <p className='cityName trapezoid'></p></div>
              </div>
              
              <div className='fade-in two'>
                <div className='box'>Date: { apiResult?.description }
                <p className='cityName trapezoid'></p></div>
              </div>
        
              <div className='fade-in three img'>
                <img className='img' scr={apiResult?.weather_icon} alt='Weather Icon'></img>
              </div>
        
              <div className='fade-in four'>
                <div className='box'>Temperature : { apiResult?.temperature }
                <p className='cityName trapezoid'></p></div>
              </div>
        
              <div className='fade-in five'>
                <div className='box'>Humidity : { apiResult?.humidity }
                <p className='cityName trapezoid'></p></div>
              </div>
            </div>)
          }
        </div>

        {apiResult.length===0 ? <p className='nohis'>No Search History</p> : <History result={apiResult[apiResult.length]} />}

      </div>

    </div>
    );

}
export default MainPage;