import React, { useState } from 'react';
import {auth} from "./firebase.js"

import './App.css';

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<any>(null)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user);
      setUser(user)
    })
  }, [])


  const onclickHandler = () => {
    console.log("mtav")
    auth.createUserWithEmailAndPassword(username, password).then(cred => {
      console.log("cred", cred)
    })
  }

  const logoutHandler = () => {
    auth.signOut().then(() => {
      console.log("usrr sign out")
    });
  }

  const logInHandler = () => {
    console.log(username, password)
    auth.signInWithEmailAndPassword(username, password).then(() => {
      console.log("usrr sign in")
    });
  }

  return (
    <div className="App">
        <input value ={username} onChange = {(e) => setUsername(e.currentTarget.value)}/>
        <input value = {password} onChange = {(e) => setPassword(e.currentTarget.value)}/>
        <button onClick = {onclickHandler}>
            Submit
        </button>

        <button onClick = {logoutHandler}>
            log out 
        </button>

        <button onClick = {logInHandler}>
            log in 
        </button>
    </div>
  );
}

export default App;
