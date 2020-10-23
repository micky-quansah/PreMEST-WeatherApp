import React, {useState, useEffect} from 'react';
import './Form.css';
import cancelLogo from "../../images/cancel.png";

function Login(props) {
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");


  const handleAuth = (e) => {
    e.preventDefault();
    if(props.logInCredentials.name === authName && props.logInCredentials.password === authPassword){
      alert("LogIn was successful")
      props.isLoggedIn(true);
      props.hideOnLogIn();
    }

  }

  function handleAuthPassword(e) {
    setAuthPassword(e.target.value)
  }

  function handleAuthName(e) {
    setAuthName(e.target.value)
  }

  return(<div>
    <h1 className="signIn" > Log In</h1> 
    <form className='hform' onSubmit={handleAuth}>
    <label title="name">
    <input id="name" value={authName} name="name" className='input input-text' type="text" placeholder="Name" onChange={handleAuthName}/><br />
    </label>
    <label title="name">
    <input className='input input-text' name="password" value={authPassword} type="password" placeholder="Password" onChange={handleAuthPassword}/><br />
    </label>
    <input type="submit" value="Submit" onClick={handleAuth} />
    </form>
    </div>);
}

function SignUp(props) {

  const [submit, setSubmit] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if(name !== "" && password !== ""){
      props.signInCredentials({
        name:name,
        password:password,
        submit:!submit
      });
      alert("You've successfully Signed Up. close to exit form");
    }
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  return (<div>
    <h1 className="signIn" >Sign Up</h1>
    <form className='hform'>
    <input type="text" value={name} onChange={handleName} name="name" className='input input-text' placeholder="Name"/><br />
    <input className='input input-text' name="password" value={password} type="password" placeholder="Password" onChange={handlePassword}/><br />
    <input type="submit" value="Submit" onClick={handleSubmit} />
    </form>
    </div>);
}

function Form(props) {
  const [credentials, setCredentials] = useState(
    {
      name:"",
      password:"",
      submit:false
    });
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    props.isLoggedIn(loggedIn);
  },[loggedIn]);
  

  return (
    <section id='form-section' id="flyout" className={props.menuVisibility} >
    <img id="cancel" src={cancelLogo} onClick={props.hide} />
      <div className="formContainer">
      {credentials.submit ? <Login logged={setLoggedIn} hideOnLogIn={props.hide} logInCredentials={credentials} /> : <SignUp signInCredentials={setCredentials} /> }
      </div>
    </section>
  );

}

export default Form;