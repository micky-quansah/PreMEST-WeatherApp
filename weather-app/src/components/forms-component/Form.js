import React, {Component} from 'react';
import './Form.css';
import cancelLogo from "../../images/cancel.png";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {submit: false};
    this.state = {name: " "};
    this.state = {password: " "};
    this.inputClick = false;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.setState({submit: true});
    event.preventDefault();
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
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
        {this.state.submit ? <h1 id="signIn" > Log In</h1> : <h1 id="signIn" >Sign Up</h1> }
        <form className='hform' onSubmit={this.handleSubmit}>
          <label title="name">
            <input id="name" value={this.state.value} name="name" className='input input-text' type="text" onClick={this.onInput()} placeholder="Name" onChange={this.handleChange} required/><br />
          </label>
          <label title="name">
            <input className='input input-text' name="password" value={this.state.value} type="password" onClick={this.onInput()} placeholder="Password" onChange={this.handleChange} required/><br />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit} onMouseDown={this.props.handleMouseDown} />
        </form>

        </div>
      </section>
    );
  }
}

export default Form;