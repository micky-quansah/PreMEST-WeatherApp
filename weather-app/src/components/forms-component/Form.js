import React, {Component} from 'react';
import './Form.css';
import cancelLogo from "../../images/cancel.png";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.inputClick = false;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('You are Logged In ' + this.state.value);
    event.preventDefault();
  }

  onInput() {
    this.inputClick = true;
    console.log(this.inputClick);
  }
  

  render(){

    this.visibility = "hide";

    if (this.props.menuVisibility && this.inputClick===true) {
      this.visibility = "show";
    }

    return (
      <section id='form-section' id="flyout" className={this.visibility} >
      <img id="cancel" src={cancelLogo} onMouseDown={this.props.handleMouseDown} />
        <div className="formContainer">
        <h1 id="signIn" >Sign Up</h1>
        <form className='hform' onSubmit={this.handleSubmit}>
          <label title="name" for="name">
            <input id="name" className='input input-text' type="text" onClick={this.onInput()} name={this.state.value} placeholder="Name" onChange={this.handleChange}/><br />
          </label>
          <label title="name" for="password">
            <input className='input input-text' type="password" onClick={this.onInput()} name={this.state.value} placeholder="Password" onChange={this.handleChange}/><br />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>

        </div>
      </section>
    );
  }
}

export default Form;