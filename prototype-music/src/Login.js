import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js"; 
import "./Login.css";
import loader from "./loader.svg";

const Login = ({ history }) => {

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/home"); 
      } catch (error) {
        alert(error);
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
          <input name="email" type="email" placeholder="Email" className="input" />
        </label>
        <br></br>
        <label className="loginLabel">
          Password 
          <br></br>
          <input name="password" type="password" placeholder="Password" className="input" />
        </label>
        <br></br>
        <button type="submit" className="buttonLogin">log in</button>
      </form>
      <p className="link">
        Already got an account?  
        <a href="/signup"> Click here</a> 
      </p>
     
    </div>
  );
};

export default withRouter(Login);