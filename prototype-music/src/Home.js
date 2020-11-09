import React, {useState, useEffect, useContext} from "react";
import app from "./base";
import "./Home.css"
import foto from "./add.png";
import loader from "./loader.svg";
import upload from "./computing-cloud.svg"
import plus from "./add.svg"
import profile from "./profile.svg"
import { auth } from "firebase";
import { AuthContext } from "./Auth.js"; 


function TodoShow({ todo, index, completeTodo, removeTodo }) {
  return (
     
    <div className="todo-border" onClick={() => removeTodo()}>
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
          select a challenge
          <br></br>  
          <input 
           type="text"
           className="inputAdd"
           placeholder="tag name..."
           value={value}
           onChange={e => setValue(e.target.value)}/>
        </label>
        <button type="submit" className="buttonUpload" onClick={handleSubmit}></button>
    </form>
  );
}


const Home = () => {

  const [todos, setTodos] = React.useState([]); 
  const { currentUser } = useContext(AuthContext);

  const addTodo = text => {
    const newTodos = [...todos, { text: text}];
    setTodos(newTodos);
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);



  const [isShown, setShown] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);

  const [placebo, setPlacebo] = useState(false);

  const [fileUrl, setFileUrl] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersCollection, setUsersCollection] = useState('');

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
  

  const uploadChange = async (e) => {

    setLoading(true);
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
    setLoading(false); 
  };  

  const uploadFile = async (e) => { 


    e.preventDefault()
    setLoadingSubmit(true)
    const filename = e.target.filename.value;
 
    if (!filename || !fileUrl) { 
      setLoadingSubmit(false)
      return;
    }

    setLoadingSubmit(true)
    await app.firestore().collection("uploads").doc(currentUser.uid).collection("tracks").doc().set({
      name: filename, 
      file: fileUrl,
      email: currentUser.email, 
      uid: currentUser.uid,
      tags: {
        todos
      }
    });

    await app.firestore().collection("allUploads").doc().set({
      name: filename, 
      file: fileUrl,
      email: currentUser.email, 
      uid: currentUser.uid,
      tags: {
        todos
      }
    });

    setLoadingSubmit(false)

  }  
 
    const fetchUsers = () => { 

        app.firestore().collection('allUploads').onSnapshot(snapshot => {

        setUsers([]);
        snapshot.forEach(user => {
          console.log(user.data());
          setUsers(users => [...users, {...user.data()}]);
        });
      }) 
      //const usersCollection = await app.firestore().collection('allUploads').doc(currentUser.uid).collection("tracks").get()
      // setUsers(usersCollection.docs.map(doc => {4
      //   return doc.data()
      // }))
    }

  useEffect(() => {
    console.log(users);
  }, [users])
    
  useEffect(() => { 
    fetchUsers(); 
  }, []) 


  // const rotateButton = () => { 
  //   setShown() = !setShown(); 
  // }; 
  
  return (
    <>
    <div>
    <header>
       <h1 className="Title">musify</h1> 
          <nav>
            <ul className="nav-area">
              <li><a href="#">discover</a></li>
              <li><a href="#">ranking</a></li> 
              <li><a href="#">challenges</a></li> 
              <li><a href="#">legal</a></li> 
            </ul>
          </nav>

          <div className="rightNav">
           
          <div className="imgProfileDiv">
            <img className="profile" src={profile}></img> 
            </div>
         
          <button className="buttonHome" onClick={() => app.auth().signOut()}>sign out</button>
        
          </div>
          
    </header>

    <div>
      {users.map((user, index) => {

        return <div key={index} className="uploadContainer">
              <h1 className="uploadTitle">{user.name}</h1>
              <a className="link" href="/login">
              <p className="uploadDescription">{user.email}</p>
              </a>
    
    

          <audio controls className="audioControls">
        <source src={user.file} type="audio/ogg"></source>
         </audio>
         <br></br>
         <br></br>
         {user.tags.todos.map((todos, index) =>  <div key={index} className="todo-border-home"><div className="todo">{todos.text}</div></div>)} 

  </div>
      })}

    </div>
  
    {/* <img className="add" src={foto} onClick={() => rotateButton()} style={{ rotate: todo.isCompleted ? "90deg" : "0deg" }}></img> */}
    <img className="add" src={foto} onClick={handlePlacebo} style={{ rotate: placebo ? "45deg" : "0deg" }}></img> 
    <div className="addContainer" style={{ display: placebo ? "flex" : "none" }}>
      <div className="addContainerItems">
       
        <form onSubmit={uploadFile}> 
        <h1 className='addTitle'>add a track</h1>
        <label className="loginLabel"> 
          track name 
          <br></br> 
          <input name="filename" type="text" placeholder="track name..." className="inputAdd" required/>
        </label>

        <br></br> 
 
        {/* <div className="buttons"> */}
        {isLoading ? "": 
        ( <div>
          <input id="file-upload" type="file" accept=".mp3" onChange={uploadChange}/>  
        <label htmlFor="file-upload" className="custom-file-upload" type="file" accept=".mp3">  
          <img className="upload" src={upload}></img>
        </label>
          </div> )}
        {isLoading ? 
        <div>
       <input id="file-upload" type="file"  onChange={uploadChange}/>  
        <label for="file-upload" class="custom-file-upload" type="file" accept="mp3">  
          <img className="loaderHome2" src={loader}></img>
        </label> </div>
          : ""}  

       
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

        {isLoadingSubmit ? "": 
        (<button type="submit" className="buttonUpload">upload</button>)}
        {isLoadingSubmit ? 
        <div> 
        <button type="submit" className="buttonUpload">
          <img className="loaderHome" src={loader}></img>
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