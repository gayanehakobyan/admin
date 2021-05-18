import * as React from "react";
import {useState} from "react";
import {auth, db} from "./firebase.js"

import './App.css';

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<any>(null)
  const [users, setUsers] = useState<any>(null)
  const [name, setName] = useState<any>("")
  const [fullname, setFullname] = useState<any>("")

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log("onAuthStateChanged", user);
      if(user){
          console.log("login")
          getCollection()
      } else {
          console.log("logout")
          setUsers([])
      }
      setUser(user)
    })
  }, [])


    // get user data in collection
    const getCollection = () => {
        db.collection("users").get().then(snapshot => {
            let dbUsers:any = [];
            console.log("snapshots", snapshot.docs)

            snapshot.docs.forEach(doc => {
                dbUsers.push(doc.data())
                console.log("snapshots", doc.data())
            })
            console.log("snapshots", dbUsers)
            setUsers(dbUsers)
        })
    }

   // create user or data in collection
  const createUser = () => {
      db.collection("users").add({
          name,
          fullname,
      }).then(() => {
            getCollection();
      })
  }

  // create user in auth
  const onclickHandler = () => {
    auth.createUserWithEmailAndPassword(username, password).then(cred => {
      console.log("cred", cred)
    })
  }

  //logout user
  const logoutHandler = () => {
    auth.signOut().then(() => {
      // console.log("usrr sign out")
    });
  }

  //login user
  const logInHandler = () => {
    console.log(username, password)
    auth.signInWithEmailAndPassword(username, password).then(() => {
      console.log("user sign in")
    });
  }

  console.log("users", users)
  return (
    <div className="App">
        {
            user ? <div>{user.email}</div> : <div>no user</div>
        }
        {
            users && users.length ?
              <ul>
                {
                    users.map((item: any) => (
                        <li>
                            <span>{item.name}</span>
                            <span>{item.fullname}</span>
                       </li>
                    ))
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

        <div>
            <input value ={name} onChange = {(e) => setName(e.currentTarget.value)}/>
            <input value = {fullname} onChange = {(e) => setFullname(e.currentTarget.value)}/>
            <button onClick = {createUser}>
               Create user
            </button>
        </div>
    </div>
  );
}

export default App;
