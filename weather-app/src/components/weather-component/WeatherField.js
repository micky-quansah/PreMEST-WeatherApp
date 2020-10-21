import React, {useEffect} from 'react';
import './WeatherField.css';
import idate from "../../images/date.png";
import ihumidity from "../../images/humidity.jpg";
import ilocation from "../../images/location.jpg";
import itemperature from "../../images/temperature.png";


function WeatherField(props) {

  const {temperature, name, humidity, description, weather_icon} = props.weather;
    console.log(props.weather);

  return (
    <div className='main'>
      <div className='fade-in one '>
        <img className='icon' src={ilocation}/>
        <div className='box'>Location: { name }
        <p className='cityName trapezoid'></p></div>
      </div>
      
      <div className='fade-in two'>
        <img className='icon' src={idate}/> 
        <div className='box'>Date: { description }
        <p className='cityName trapezoid'></p></div>
      </div>

      <div className='fade-in three img'>
        <img className='img' scr={weather_icon} alt='Weather Icon'></img>
      </div>

      <div className='fade-in four'>
        <img  className='icon' src={itemperature}/> 
        <div className='box'>Temperature : { temperature }
        <p className='cityName trapezoid'></p></div>
      </div>

      <div className='fade-in five'>
        <img  className='icon' src={ihumidity}/> 
        <div className='box'>Humidity : { humidity }
        <p className='cityName trapezoid'></p></div>
      </div>
    </div>
  );
  
}


export default WeatherField;