import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './MainPage.css';
import Form from '../forms-component/Form';
import LoginButton from '../login-component/LoginButton';
import History from '../history-component/History';
import WeatherField from '../weather-component/WeatherField';


//const FAPI = 'http://api.weatherstack.com/forecast?access_key=c8f8a6be5b8fc1c09e0cc5de68450744&query=fetch:ip&forecast_days=7&hourly=1&units=m';

function MainPage() {
  const [visible, setformVisibility]= useState("hide");
  const [click, setclick]= useState(false);
  const [data, setApiData] = useState([]);
  const [url, setUrl] = useState('http://api.weatherstack.com/current?access_key=c8f8a6be5b8fc1c09e0cc5de68450744&query=fetch:ip&units=m');
  const [query, setQuery] = useState('fetch:ip');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  let apiResult = [{}]

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        const {data} = result;
        const {current, location} = data;
        const {temperature, humidity, weather_descriptions, weather_icons} = current;
        const {name, country} = location;

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

      setIsLoading(false);
    };

    fetchData();
    console.log(apiResult);
  },[url]);
  
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

  return (
    <div>
      <Form className='theForm' handleMouseDown={handleMouseDown} menuVisibility={visible} />
    
      <div className='grid-container'>

        <LoginButton className="theButton" handleMouseDown={handleMouseDown} />

        <div className= 'search'>

          <form className="form" id="addItemForm" role="search">
            <input className="fsearch" 
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search..." 
              id="addInput" 
              required />
            <button className="button" type="submit" onClick={() => 
              setUrl(`http://api.weatherstack.com/current?access_key=c8f8a6be5b8fc1c09e0cc5de68450744&query=${query}:ipunits=m`)}>Go</button>    
          </form>

          {isError ? (<div className='mmain'>Something went wrong ...</div>) :
            isLoading ? 
              (<div className='mmain'>Loading ...</div>) : 
              (<WeatherField className= 'mmain' weather={apiResult}/>)
          }
        </div>

        {data.length===0 ? <p className='nohis'>No Search History</p> : <History result={apiResult[apiResult.length-1]} />}

      </div>

    </div>
    );

}
export default MainPage;