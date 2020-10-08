import React, { Component } from 'react';
import './SearchField.css';

class SearchField extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <>
      <section className="section">
        <ul>
          {this.state.list.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      </>
    );
  }
}

export default SearchField;