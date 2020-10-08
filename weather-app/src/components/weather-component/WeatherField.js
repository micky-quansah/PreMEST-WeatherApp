import React, { Component } from 'react';
import './WeatherField.css';

class WeatherField extends Component {
  render() {
    return (
      <>
      <div className='main'>
        <h1>Accra</h1>
        <p>Sunny</p>
        <img src='' />
        <h3>25 deg</h3>
        <h5>A cool Day</h5>
      </div>
      </>
    );
  }
}

export default WeatherField;