import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js"; 
import "./Login.css";
import loader from "./loader.svg";

const Login = ({ history }) => {

  const [isLoading, setLoading] = useState(false);
  // const delay = ms => new Promise(res => setTimeout(res, ms));
  const handleLogin = useCallback(

    async event => {

      setLoading(true);
      // setTimeout(() => {
      //  setLoading(false);
      // }, 3500);

      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app.auth().signInWithEmailAndPassword(email.value, password.value); 
        setLoading(false);
        history.push("/home"); 
      } catch (error) {
        alert(error); 
        setLoading(false);
      }
    }, 
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/home" />;
  } 

  return (
    <div className="loginContainer"> 
      <h1 className="loginTitle">log in</h1>
      <form onSubmit={handleLogin}> 
        <label className="loginLabel">
          Email
          <br></br> 
          <input name="email" type="email" placeholder="Email" className="input" required/>
        </label>
        <br></br>
        <label className="loginLabel">
          Password 
          <br></br>
          <input name="password" type="password" placeholder="Password" className="input" required/>
        </label>
        <br></br>
        {isLoading ? "": 
        (<button type="submit" className="buttonLogin">log in</button>)}
        {isLoading ? 
        <div className="buttonLoad">
        <button type="submit" className="buttonLogin">
          <img className="loader" src={loader}></img>
          </button> </div>
          : ""}  
      </form>
      <p className="link"> 
        Already got an account?   
        <a href="/signup"> Click here</a> 
      </p>
     
    </div>
  );
};

export default withRouter(Login);