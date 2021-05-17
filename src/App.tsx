import * as React from "react";
import {useState} from "react";
import {auth, db} from "./firebase.js"

import './App.css';

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<any>(null)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log("onAuthStateChanged", user);
      if(user){
          console.log("login")


      } else {
          console.log("logout")
          setUsers([])
      }
      setUser(user)
    })



  }, [])



    const getCollection = () => {
        db.collection("users").get().then(snapshot => {
            let dbUsers:any = [];
            console.log("snapshots", snapshot.docs)

            snapshot.docs.forEach(doc => {
                dbUsers.push(doc.data())
                console.log("snapshots", doc.data())
            })

            setUsers(dbUsers)
        })
    }

  const onclickHandler = () => {
    console.log("mtav")
    auth.createUserWithEmailAndPassword(username, password).then(cred => {
      console.log("cred", cred)
    })
  }

  const logoutHandler = () => {
    auth.signOut().then(() => {
      // console.log("usrr sign out")
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
        {
            user ? <div> user ka</div> : <div>no user</div>
        }
        {
            users && users.length ?
              <ul>
                {
                    users.map((item: any) => {
                        <li>
                            <span>{item.name}</span>
                            <span>{item.fullname}</span>
                       </li>
                    })
                }
            </ul> : <div> No list</div>
        }
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
