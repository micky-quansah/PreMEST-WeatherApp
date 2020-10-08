import React, { Component } from 'react';
import './History.css';

class History extends Component {
  constructor(props){
    super(props);
  }

  

  render() {
    return (
      <>
      <section>
        <ul>
          {this.props.result.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      </>
    );
  }
}

export default History;