import React, { useCallback, useContext, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "./Auth";
import app from "./base";
import "./SignUp.css";
import * as firebase from 'firebase';
import 'firebase/firestore';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/home");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  const { currentUser } = useContext(AuthContext);

 useEffect(() => {
    if (currentUser) {
         app.firestore().collection('users').doc(currentUser.uid).set({
            email: currentUser.email,
            uid: currentUser.uid
      })   
    } 
 }, [currentUser]); 
   

  return (
    <div className="registerContainer">
    <h1 className="registerTitle">sign up</h1>
    <form onSubmit={handleSignUp}> 
      <label className="registerLabel">
        email
        <br></br>
        <input name="email" type="email" placeholder="Email" className="input" />
      </label>
      <br></br>
      <label className="registerLabel"> 
        password 
        <br></br> 
        <input name="password" type="password" placeholder="Password" className="input" />
      </label>
      <br></br>
      <button type="submit" className="buttonRegister">sign up</button>
    </form>
    <p className="link"> 
        Already got an account?  
        <a href="/login"> Click here</a> 
      </p>
  </div>
  );
};

export default withRouter(SignUp);