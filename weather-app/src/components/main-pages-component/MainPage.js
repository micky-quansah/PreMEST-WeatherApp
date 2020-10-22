import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './MainPage.css';
import Form from '../forms-component/Form';
import LoginButton from '../login-component/LoginButton';
import History from '../history-component/History';


//const FAPI = 'http://api.weatherstack.com/forecast?access_key=c8f8a6be5b8fc1c09e0cc5de68450744&query=fetch:ip&forecast_days=7&hourly=1&units=m';
//let apiResult = [];



function  MainPage() {

  const [visible, setformVisibility]= useState("hide");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState({value:''});
  const [isError, setIsError] = useState(false);
  const [apiResult, setApiResult] = useState([])

  
  //let loading = false;

  const fetchData = async (url) => {
    setIsError(false);
    setLoading(true);
    let tempResult = apiResult;

    try {
      const result = await axios(url);
      const {data} = result;
      const {current, location} = await data;
      const {temperature, humidity, weather_descriptions, weather_icons} = await current;
      const {name, country} = await location;

      let resObject = {
        temperature: temperature,
        humidity: humidity,
        descriptions: weather_descriptions[0],
        weather_icons: weather_icons[0],
        name: name,
        country: country
      }

      tempResult.unshift(resObject);

      if (tempResult.length > 5) {
        tempResult = tempResult.slice(0, 5)
      }

      setApiResult(tempResult);

      console.log(tempResult);

    } catch (error) {
      setIsError(true);
    }

    setLoading(false);
  };

  useEffect(()=>{
    fetchData('http://api.weatherstack.com/current?access_key=c8f8a6be5b8fc1c09e0cc5de68450744&query=fetch:ip&units=m');
  },[]);
  
  function handleLogin(e) {
    setformVisibility("show");
    e.stopPropagation();
  }

  function handleCancel(e) {
    setformVisibility("hide");
    e.stopPropagation();
    console.log("clicked " + visible);
  }

  function handleQuery(e) {
    setQuery({value: e.target.value})
  }

  function handleSearch(e) {
    e.preventDefault();
    console.log(query)
    const url = `http://api.weatherstack.com/current?access_key=c8f8a6be5b8fc1c09e0cc5de68450744&query=${query.value}&units=m`;
    fetchData(url);
  }

  const arrLength = apiResult.length;

  return (
    <div className={apiResult[0]?.descriptions}>
      <Form className='theForm' onClick={handleCancel} menuVisibility={visible} />
    
      <div className='grid-container'>

        <LoginButton className="theButton" onClick={handleLogin} />

        <div className= 'search'>

          <form className="form" id="addItemForm" role="search">
            <input className="fsearch" 
              type="search"
              value={query.value}
              onChange={handleQuery}
              placeholder="Search..." 
              id="addInput"/>
            <button className="button" type="submit" onClick={handleSearch}>Go</button>    
          </form>

          {isError ? (<div className='mmain'>Something went wrong ...</div>) :
            loading ? 
              (<div className='mmain'>Loading ...</div>) : 
              (<div className='main'>
              <div className='fade-in one '>
                <div className='location'>Location: {apiResult[0]?.name} - {apiResult[0]?.country}</div>
              </div>
              
              <div className='fade-in two'>
                <div className='condition'>Condition: { apiResult[0]?.descriptions }</div>
              </div>
        
              {/* <div className='fade-in three img'>
                <img className='img' scr={apiResult[0]?.weather_icons} alt='Weather Icon'></img>
              </div> */}
        
              <div className='fade-in four'>
                <div className='temperature'>Temperature : { apiResult[0]?.temperature }</div>
              </div>
        
              <div className='fade-in five'>
                <div className='humidity'>Humidity : { apiResult[0]?.humidity }</div>
              </div>
            </div>)
          }
        </div>

        {apiResult.length===0 ? <p className='nohis'>No Search History</p> : <History result={apiResult} />}

      </div>

    </div>
    );

}
export default MainPage;