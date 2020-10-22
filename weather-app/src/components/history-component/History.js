import React from 'react';
import './History.css';

function History (props) {

  const weatherHistory = props.result;

    return (
      <div className="hmain">
          {weatherHistory.map(
            (item, index) => (
              <ul key={index}>
              <li >{item.name}</li>
              <li >{item.descriptions}</li>
              </ul>
            ))
          }
      </div>
    );
}

export default History;