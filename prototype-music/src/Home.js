import React, {useState, useEffect} from "react";
import app from "./base";
import "./Home.css"
import foto from "./add.png";
import loader from "./loader.svg";
import upload from "./computing-cloud.svg"
import plus from "./add.svg"

function TodoShow({ todo, index, completeTodo, removeTodo }) {
  return (
     
    <div className="todo-border">
       <div className="todo"> 
        {todo.text}
       </div>
    </div> 
  );  
};


function TodoAdd({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="loginLabel">
          add a tag
          <br></br>  
          <input 
           type="text"
           className="inputAdd"
           placeholder="tag name..."
           value={value}
           onChange={e => setValue(e.target.value)}/>
        </label>
    </form>
  );
}




const Home = () => {

  const [todos, setTodos] = React.useState([]); 

  const addTodo = text => {
    const newTodos = [...todos, { text: text, isCompleted: false, type: 'text' }];
    setTodos(newTodos);
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const [isShown, setShown] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [placebo, setPlacebo] = useState(false);

  const handlePlacebo = () => {
    setPlacebo(!placebo); 
    console.log(placebo);
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1); 
    setTodos(newTodos); 
  };

  const handleUpload = () => {

  }

  // const rotateButton = () => { 
  //   setShown() = !setShown(); 
  // }; 
  

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
  
    {/* <img className="add" src={foto} onClick={() => rotateButton()} style={{ rotate: todo.isCompleted ? "90deg" : "0deg" }}></img> */}
    <img className="add" src={foto} onClick={handlePlacebo} style={{ rotate: placebo ? "45deg" : "0deg" }}></img> 
    <div className="addContainer" style={{ display: placebo ? "flex" : "none" }}>
      <div className="addContainerItems">
       
        <form onSubmit={handleUpload}> 
        <h1 className='addTitle'>add a track</h1>
        <label className="loginLabel">
          track name
          <br></br> 
          <input name="text" type="text" placeholder="track name..." className="inputAdd" required/>
        </label>

        <br></br>

        {/* <div className="buttons"> */}
            <label for="file-upload" class="custom-file-upload">
              <img className="upload" src={upload}></img>
            </label> 
            {/* <button class="custom-file-upload2">
              <img className="plus" src={plus}></img>
            </button> */}
        {/* </div>
        */}
      <br></br>
{/* <label className="loginLabel">
          add a tag
          <br></br> 
          <input name="email" type="email" placeholder="tag name" className="inputAdd" required/>
        </label> */}
            <TodoAdd addTodo={addTodo} />
            <br></br>
            <div className="todo-list">
              {todos.map((todo, index) => (
              
             <TodoShow
                key={index} 
                index={index}
                todo={todo} 
                removeTodo={removeTodo}  
            /> 
        ))} 
        
      </div>



    <input id="file-upload" type="file"/>
        {isLoading ? "": 
        (<button type="submit" className="buttonUpload">upload</button>)}
        {isLoading ? 
        <div className="buttonUpload">
        <button type="submit" className="buttonUpload">
          <img className="loader" src={loader}></img>
          </button> </div>
          : ""}  
      </form>
      </div>
    
    </div>


    </div>
 

   
    </>
  );
};


export default Home;