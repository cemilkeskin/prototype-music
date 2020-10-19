import React from "react";
import app from "./base";
import "./Home.css"
import foto from "./add.png";

const Home = () => {
  return (
    <>
    <div>
    <header>
       <h1 className="Title">musify</h1>
          <nav>
            <ul class="nav-area">
              <li><a href="#">discover</a></li>
              <li><a href="#">ranking</a></li>
              <li><a href="#">challenges</a></li>
              <li><a href="#">legal</a></li> 
            </ul>
          </nav>
          <button className="buttonHome" onClick={() => app.auth().signOut()}>sign out</button>
    </header>
    <img className="add" src={foto}></img>
    </div>
   
    </>
  );
};


export default Home;