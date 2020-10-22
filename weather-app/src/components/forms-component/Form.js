import React, {useState} from 'react';
import './Form.css';
import cancelLogo from "../../images/cancel.png";

function Form(props) {
  const [submit, setSubmit] = useState(false);
  const [name, setName] = useState({value:""});
  const [password, setPassword] = useState({value:""});
  const [authPassword, setAuthPassword] = useState({value:""});
  const [authName, setAuthName] = useState({value:""});

  function Login() {

    const handleAuth = (e) => {
      e.preventDefault();
      if(name === authName && password === authPassword){
        alert("LogIn was successful")
        setSubmit({submit: true});
      }
    }

    function handleAuthPassword(e) {
      setAuthPassword({value: e.target.value})
    }

    function handleAuthName(e) {
      setAuthName({value: e.target.value})
    }
  
    return(<div>
      <h1 className="signIn" > Log In</h1> 
      <form className='hform' onSubmit={handleAuth}>
      <label title="name">
      <input id="name" value={authName.value} name="name" className='input input-text' type="text" placeholder="Name" onChange={handleAuthName}/><br />
      </label>
      <label title="name">
      <input className='input input-text' name="password" value={authPassword.value} type="password" placeholder="Password" onChange={handleAuthPassword}/><br />
      </label>
      <input type="submit" value="Submit" onClick={handleAuth} />
      </form>
      </div>);
  }

  function SignUp() {

    function handleSubmit(event) {
      event.preventDefault();
      if(name >= 0 && password >= 0){
        setSubmit({submit: true});
      }
    }
  
    function handlePassword(e) {
      setPassword({value: e.target.value})
    }
  
    function handleName(e) {
      setName({value: e.target.value})
    }
  
    return (<div>
      <h1 className="signIn" >Sign Up</h1>
      <form className='hform'>
      <label title="name">
      <input id="name" value={name.value} name="name" className='input input-text' type="text" placeholder="Name" onChange={handleName}/><br />
      </label>
      <label title="name">
      <input className='input input-text' name="password" value={password.value} type="password" placeholder="Password" onChange={handlePassword}/><br />
      </label>
      <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
      </div>);
  }

  return (
    <section id='form-section' id="flyout" className={props.menuVisibility} >
    <img id="cancel" src={cancelLogo} onClick={props.onClick} />
      <div className="formContainer">
      {submit ? <Login/> : <SignUp/> }
      </div>
    </section>
  );

}

export default Form;